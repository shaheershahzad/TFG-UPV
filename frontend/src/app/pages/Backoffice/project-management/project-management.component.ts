import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { UploadService } from '../../../services/upload.service';
import { AuthService } from '../../../services/auth.service';
import { FileService } from '../../../services/file.service';
import { FileModel } from '../../../models/file';
import { ObjectID } from 'bson';

declare const M: any;
declare const L: any;

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
  providers: [ProjectService]
})
export class ProjectManagementComponent implements OnInit {

  uploadedFiles: Array<File>;
  public hasDocuments: boolean = false;
  public projectsAvailable: boolean = false;
  public projectLocation = "";

  constructor(public projectService: ProjectService, public uploadService: UploadService, private authService: AuthService, public fileService: FileService) { }

  ngOnInit(): void {

    var ubicacion = "Valencia";

    //Modals
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    });

    //Desplegable documentos
    let options = {
      onCloseEnd: this.hasDocuments = false
    }
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems, options);
    });

    this.getProjects();

    var mymap = L.map('map', {
      center: [39.46975, -0.37739],
      zoom: 13
    });

    var marker = L.marker([39.46975, -0.37739], { title: "Valencia" }).addTo(mymap);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(mymap);

    (<HTMLInputElement> document.querySelector("#coordenadas")).innerHTML = "39.46975,-0.37739";
    (<HTMLInputElement> document.querySelector("#location")).innerHTML = ubicacion; 

    // Código para ocultar las atribuciones
    (<HTMLInputElement> document.querySelector(".leaflet-control-attribution.leaflet-control")).style.display = "none";

    // Este listener es para renderizar correctamente el mapa al abrir un modal
    document.addEventListener("click", function(){
      mymap.invalidateSize();
    });

    mymap.on('click', function(e) {        
      var popLocation= e.latlng;
      (<HTMLInputElement> document.querySelector("#coordenadas")).innerHTML = popLocation.lat+","+popLocation.lng;
      
      mymap.removeLayer(marker);
      marker = L.marker(popLocation).addTo(mymap);
      
      const Http = new XMLHttpRequest();
      const url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+popLocation.lat+"&lon="+popLocation.lng;
      Http.open("GET", url);
      Http.send();

      Http.onreadystatechange = (e) => {
        if (Http.readyState == 4) {
          let coordData = JSON.parse(Http.responseText);
          if(coordData.address.village != undefined){
            ubicacion = coordData.address.village;
          }else if(coordData.address.county != undefined){
            ubicacion = coordData.address.county;
          }else if(coordData.address.city != undefined){
            ubicacion = coordData.address.city;
          }else if(coordData.address.country != undefined){
            ubicacion = coordData.address.country;
          }else{
            ubicacion = "No localizable";
          }

          (<HTMLInputElement> document.querySelector("#location")).innerHTML = ubicacion;

          var popup = L.popup()
          .setLatLng(popLocation)
          .setContent('<p>'+ ubicacion +'</p>')
          .openOn(mymap);
        }
      }
    });
  }

  getProjects(){
    this.projectService.getProjects().subscribe( res => {
      this.projectService.projects = res as Project[];

      if(this.projectService.projects.length > 0){
        this.projectsAvailable = true;
      }else{
        this.projectsAvailable = false;
      }
    });
  }

  getProjectFiles(id: String){
    this.fileService.getProjectFiles(id).subscribe( res => {
      this.fileService.files = res as FileModel[];
      
      if(this.fileService.files.length > 0){
        this.hasDocuments = true;
      }
    });
  }

  addProject(form): void{

    (<HTMLInputElement> document.getElementById("progressBarAdd")).style.display = "block";
    this.projectLocation ="2";

    let _idProject = new ObjectID().toString();
    let coordinates = (<HTMLInputElement> document.querySelector("#coordenadas")).innerHTML;
    let location = (<HTMLInputElement> document.querySelector("#location")).innerHTML; 
    let project = new Project(_idProject, form.value.name, form.value.description, coordinates, location);

    this.projectService.addProject(project).subscribe( res => {

      if(this.uploadedFiles != undefined && this.uploadedFiles.length > 0){

        let savedProjectId = JSON.parse(JSON.stringify(res)).id;
        let uid = this.authService.getUID();
        this.uploadFilesToServer(savedProjectId, uid);
        this.clearForm(form);
        (<HTMLInputElement> document.getElementById("progressBarAdd")).style.display = "none";
        M.toast({html: "Proyecto creado"});

      }else{

        this.clearForm(form);
        (<HTMLInputElement> document.getElementById("progressBarAdd")).style.display = "none";
        M.toast({html: "Proyecto creado"});
        this.getProjects();

      }

    }, ( err => {
      console.log("Error al crear el proyecto.");
    }));

  }

  uploadFilesToServer(projectId: string, userId: string) {

    let formData = new FormData();

    for(let i=0; i<this.uploadedFiles.length; i++){
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }

    this.uploadService.uploadFile(formData).subscribe( res => {

      let filesUploaded = JSON.parse(JSON.stringify(res));
      this.saveFilesDatabase(filesUploaded, projectId, userId);          

    }, err => {
      console.log("Error al subir ficheros al servidor");
    });

  }

  saveFilesDatabase(uploadedFiles, projectId: string, userId: string){

    let tmpFiles: Array<FileModel> = new Array<FileModel>();

    uploadedFiles.forEach(file => {
      let fileId = new ObjectID().toString();
      let uploadedName = file.path.split("\\");
      uploadedName = uploadedName[uploadedName.length-1];
      let fileToAdd = new FileModel(fileId, file.name, uploadedName, file.path, file.size, file.type, projectId, userId);
      tmpFiles.push(fileToAdd);
    });

    this.fileService.addFiles(tmpFiles).subscribe( res => {

      this.getProjects();
      console.log("Ficheros subidos");

    }, err => {
      console.log("Error al guardar la información de ficheros");
    });

  }

  viewProjectDetails(form, project: Project) {
    //this.projectService.selectedProject = project;
    this.hasDocuments = false;
    this.getProjectFiles(project._id);
    this.setFormValues(form, project);
  }

  editProject(form, project: Project) {
    this.getProjectFiles(project._id);
    this.setFormValues(form, project);
  }

  updateProject(form) {

    (<HTMLInputElement> document.getElementById("progressBarEdit")).style.display = "block";
    this.projectService.updateProject(form.value).subscribe( res => {

      if(this.uploadedFiles != undefined && this.uploadedFiles.length > 0){

        let updatedProjectId = form.value._id;
        let uid = this.authService.getUID();
        this.uploadFilesToServer(updatedProjectId, uid);
        this.clearForm(form);
        (<HTMLInputElement> document.getElementById("progressBarEdit")).style.display = "none";
        M.toast({html: "Proyecto actualizado"});

      }else{

        this.clearForm(form);
        (<HTMLInputElement> document.getElementById("progressBarEdit")).style.display = "none";
        M.toast({html: "Proyecto actualizado"});
        this.getProjects();

      }
      
    }, ( err => {
      console.log("Error al actualizar los datos del proyecto.");
    }));

  }

  showDeleteProjectConfirmation(id: string, name: string) {
    (<HTMLInputElement>document.querySelector('#projectID')).value = id;
    (<HTMLInputElement>document.querySelector('#projectNameDelete')).innerText = name;
    document.getElementById("deleteProjectAction").click();
  }

  deleteProject() {

    let projectId = (<HTMLInputElement>document.querySelector('#projectID')).value;
    let conserveProjectFiles = (<HTMLInputElement>document.querySelector('#filesConservationOption')).checked;
    this.projectService.deleteProject(projectId).subscribe( res => {
      if(conserveProjectFiles){

        M.toast({html: "Proyecto borrado"});
        this.getProjects();

      }else{

        this.fileService.deleteProjectFiles(projectId).subscribe( res => {

          M.toast({html: "Proyecto borrado"});
          this.getProjects();

        }, err => {
          console.log("Error al borrar los ficheros del proyecto.");
        });

      }      
    }, ( err => {
      console.log("Error al borrar el proyecto.");
    }));

  }

  deleteFile(e){
    
    if(e.target.id !== null){
      let fileId = e.target.id;

      this.fileService.deleteFile(fileId).subscribe( res => {
        (<HTMLInputElement>document.querySelector('._'+fileId)).remove();
        M.toast({html: "Fichero borrado"});
      }, err => {
        console.log("Error al borrar el fichero.");
      });
    }
    
  }

  clearForm(form) {
    form.resetForm();
    this.projectService.selectedProject = new Project();
    this.getProjects();
  }

  setFormValues(form, project: Project){
    form.resetForm();
    form.setValue({
      _id: project._id,
      name: project.name,
      description: project.description
    });
  }

  handleFileInput(e) {
    this.uploadedFiles = e.target.files;
    console.log(this.uploadedFiles);
  }

}
