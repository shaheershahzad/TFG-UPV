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

    //Select
    /*document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelector('select');
      var instances = M.FormSelect.init(elems);
    });*/

    this.getProjects();
    this.getWorkers();
  }

  getUsers(){
    this.authService.getUsers().subscribe( res => {
      this.authService.users = res as User[];
    });
  }

  getWorkers() {
    this.authService.getWorkers().subscribe( res => {
      this.authService.workers = res as User[];
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

  setVolunteersModal(projectId: string) {
    let volunteers = [];
    (<HTMLInputElement>document.querySelector('#projectIdVolunteers')).value = projectId;

    let addButtons = document.getElementsByClassName("addVolunteer");
    for(let i=0; i<addButtons.length; i++){
      (<HTMLInputElement> addButtons[i]).style.display = "block";
    }

    let removeButtons = document.getElementsByClassName("removeVolunteer");
    for(let i=0; i<removeButtons.length; i++){
      (<HTMLInputElement> removeButtons[i]).style.display = "none";
    }

    this.projectService.getVolunteers(projectId).subscribe((res:any) => {
      volunteers = res;
      //console.log(volunteers);
      if(volunteers.length > 0){

        for(let i=0; i<volunteers.length; i++){
          let elem = (<HTMLInputElement> document.getElementById("add_"+volunteers[i]));

          if(elem){
            elem.style.display = "none";
            (<HTMLInputElement> document.getElementById("remove_"+volunteers[i])).style.display = "block";
          }
        }

        let volunteerButtons = document.getElementsByClassName("volunteerContainer");
        for(let i=0; i<volunteerButtons.length; i++){
          if(volunteerButtons[i].getElementsByTagName("i").length == 2){
            if(volunteerButtons[i].getElementsByTagName("i")[0].style.display != "none"){
              volunteerButtons[i].getElementsByTagName("i")[1].style.display = "none";
            }
          }
        }

      }
    });
  }

  addVolunteer(event) {
    let projectId = (<HTMLInputElement>document.querySelector('#projectIdVolunteers')).value;
    let workerId = event.target.id.split("_")[1];
    let icon = (<HTMLInputElement> document.getElementById("add_"+workerId));
    this.projectService.addVolunteer(projectId, {volunteer: workerId}).subscribe(res => {
      //icon.style.color = "#B71C1C"
      //icon.innerHTML = "remove_circle";
      icon.style.display = "none";
      (<HTMLInputElement> document.getElementById("remove_"+workerId)).style.display = "block";
      M.toast({html: "Voluntario añadido"});
    }, err => {
      M.toast({html: "Error al añadir voluntario"});
    });
    /*if(icon.innerHTML == "add_circle"){

      //console.log(workerId);
      this.projectService.addVolunteer(projectId, {volunteer: workerId}).subscribe(res => {
        icon.style.color = "#B71C1C"
        icon.innerHTML = "remove_circle";
        M.toast({html: "Voluntario añadido"});
      }, err => {
        M.toast({html: "Error al añadir voluntario"});
      });
      
    }else if(icon.innerHTML == "remove_circle"){

      this.projectService.removeVolunteer(projectId, {volunteer: workerId}).subscribe(res => {
        icon.style.color = "#01579b";
        icon.innerHTML = "add_circle";
        M.toast({html: "Voluntario quitado"});
      }, err => {
        M.toast({html: "Error al quitar voluntario"});
      });
      
    }*/
  }

  removeVolunteer(event) {
    let projectId = (<HTMLInputElement>document.querySelector('#projectIdVolunteers')).value;
    let workerId = event.target.id.split("_")[1];
    let icon = (<HTMLInputElement> document.getElementById("remove_"+workerId));
    this.projectService.removeVolunteer(projectId, {volunteer: workerId}).subscribe(res => {
      //icon.style.color = "#01579b";
      //icon.innerHTML = "add_circle";
      icon.style.display = "none";
      (<HTMLInputElement> document.getElementById("add_"+workerId)).style.display = "block";
      M.toast({html: "Voluntario quitado"});
    }, err => {
      M.toast({html: "Error al quitar voluntario"});
    });
  }

  isProjectVolunteer(workerId: string): boolean {
    let isVolunteer = false;
    let projectId = (<HTMLInputElement>document.querySelector('#projectIdVolunteers')).value;

    this.projectService.checkVolunteer(projectId, workerId).subscribe(res => {
      //console.log(res);
      isVolunteer = true;
    });

    return isVolunteer;
  }

}
