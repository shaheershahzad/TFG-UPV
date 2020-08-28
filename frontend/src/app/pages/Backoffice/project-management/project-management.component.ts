import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { MailService } from '../../../services/mail.service';
import { NewsletterService } from '../../../services/newsletter.service';
import { Project } from '../../../models/project';
import { User } from '../../../models/user';
import { UploadService } from '../../../services/upload.service';
import { AuthService } from '../../../services/auth.service';
import { FileService } from '../../../services/file.service';
import { FileModel } from '../../../models/file';

import { ObjectID } from 'bson';
import { subscribeOn } from 'rxjs/operators';

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
  selectedVolunteers;

  constructor(public projectService: ProjectService, 
    public uploadService: UploadService, 
    public authService: AuthService, 
    public fileService: FileService,
    private newsletterService: NewsletterService,
    private mailService: MailService) { }

  ngOnInit(): void {

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

    this.getUsers();

    //Select
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelector('select');
      var instances = M.FormSelect.init(elems);
    });

    this.getProjects();
    
  }

  getUsers(){
    this.authService.getUsers().subscribe( res => {
      this.authService.users = res as User[];

      var elems = document.querySelector('select');
      var instances = M.FormSelect.init(elems);
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

    //console.log(project);
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

      //Broadcast mail sender
      this.sendProjectBroadcast();

    }, ( err => {
      console.log("Error al crear el proyecto.");
    }));

  }

  sendProjectBroadcast(){
    this.newsletterService.getSubscribers().subscribe( (res: any) => {

      let newsletterUsers = res;
      //console.log(newsletterUsers);

      this.mailService.sendProjectCreated({subject: "Proyecto nuevo", subscribers: newsletterUsers});

    });
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

  viewProjectDetails(project: Project) {
    //this.projectService.selectedProject = project;
    this.hasDocuments = false;
    this.getProjectFiles(project._id);
    this.setProjectInfo(project);
    //this.setFormValues(form, project);
  }

  editProject(form, project: Project) {
    this.getProjectFiles(project._id);
    this.setFormValues(form, project);
    /*(<HTMLInputElement> document.getElementsByTagName("app-map")[0]).remove();
    (<HTMLInputElement> document.getElementById("mapEdit")).innerHTML = "<app-map></app-map>";*/
    //this.loadEditMap();
  }

  updateProject(form) {

    (<HTMLInputElement> document.getElementById("progressBarEdit")).style.display = "block";
    console.log(form.value);
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
      description: project.description,
      location: project.location
    });
  }

  setProjectInfo(project: Project){
    (<HTMLInputElement> document.getElementById("nameDetail")).innerHTML = project.name.toString();
    (<HTMLInputElement> document.getElementById("descriptionDetail")).innerHTML = project.description.toString();
    (<HTMLInputElement> document.getElementById("placeDetail")).innerHTML = project.location.toString();
  }

  handleFileInput(e) {
    this.uploadedFiles = e.target.files;
    console.log(this.uploadedFiles);
  }

  addVolunteer() {
    console.log("Añadir voluntarios ahora");
    var elem = document.querySelectorAll('select');
    var instance = M.FormSelect.init(elem);
    //var instance = M.FormSelect.getInstance(elem);
    //console.log(instance.getSelectedValues());
    console.log(this.getSelectedValues(document.querySelectorAll('select option')));
  }

  getSelectedValues(select) {
    //console.log(select);
    var result = [];
    var opt;
  
    for (var i=0, iLen=select.length; i<iLen; i++) {
      opt = select[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    console.log(result);
    return result;
  }

}
