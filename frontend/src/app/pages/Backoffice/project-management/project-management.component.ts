import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { UploadService } from '../../../services/upload.service';
import { AuthService } from '../../../services/auth.service';
import { FileService } from '../../../services/file.service';
import { FileModel } from '../../../models/file';
import { ObjectID } from 'bson';

declare const M: any;

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
  providers: [ProjectService]
})
export class ProjectManagementComponent implements OnInit {

  uploadedFiles: Array<File>;

  constructor(public projectService: ProjectService, public uploadService: UploadService, private authService: AuthService, private fileService: FileService) { }

  ngOnInit(): void {

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    });

    this.getProjects();
  }

  getProjects(){
    this.projectService.getProjects().subscribe(res => {
      this.projectService.projects = res as Project[];
    });
  }

  addProject(form): void{
    (<HTMLInputElement> document.getElementById("progressBar")).style.display = "block";
    this.projectService.addProject(form.value).subscribe( res => {

      if(this.uploadedFiles.length > 0){

        let savedProjectId = JSON.parse(JSON.stringify(res)).id;
        let uid = this.authService.getUID();

        let formData = new FormData();

        for(let i=0; i<this.uploadedFiles.length; i++){
          formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
        }

        this.uploadService.uploadFile(formData).subscribe( res => {

          let filesUploaded = JSON.parse(JSON.stringify(res));
          let tmpFiles: Array<FileModel> = new Array<FileModel>();

          filesUploaded.forEach(file => {
            let fileId = new ObjectID().toString();
            let fileToAdd = new FileModel(fileId, file.name, file.path, file.size, file.type, savedProjectId, uid);
            tmpFiles.push(fileToAdd);
          });

          this.fileService.addFiles(tmpFiles).subscribe( res => {

            this.clearForm(form);
            (<HTMLInputElement> document.getElementById("progressBar")).style.display = "none";
            M.toast({html: "Proyecto creado"});
            this.getProjects();
            console.log("Ficheros subidos");

          }, err => {
            console.log("Error al guardar la información de ficheros");
          });


        }, err => {
          console.log("Error al subir fichero");
        });

      }else{

        this.clearForm(form);
        (<HTMLInputElement> document.getElementById("progressBar")).style.display = "none";
        M.toast({html: "Proyecto creado"});
        this.getProjects();

      }

    }, ( err => {
      console.log("Error al crear el proyecto.");
    }));
  }


  handleFileInput(e) {
    this.uploadedFiles = e.target.files;
    console.log(this.uploadedFiles);
  }

  uploadFiles() {
    let formData = new FormData();

    for(let i=0; i<this.uploadedFiles.length; i++){
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }

    this.uploadService.uploadFile(formData).subscribe( res => {
      console.log("Fichero subido");
    }, err => {
      console.log("Error al subir fichero");
    });
  }

  viewProjectDetails(form, project: Project) {
    //this.projectService.selectedProject = project;
    this.setFormValues(form, project);
  }

  editProject(form, project: Project) {
    this.setFormValues(form, project);
  }

  updateProject(form) {
    this.projectService.updateProject(form.value).subscribe( res => {
      M.toast({html: "Proyecto actualizado"});
      this.getProjects();
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
    console.log("Deleting project: "+(<HTMLInputElement>document.querySelector('#projectID')).value);
    this.projectService.deleteProject((<HTMLInputElement>document.querySelector('#projectID')).value).subscribe( res => {
      M.toast({html: "Proyecto borrado"});
      this.getProjects();
    }, ( err => {
      console.log("Error al borrar el proyecto.");
    }));
  }

  clearForm(form) {
    form.reset();
    this.projectService.selectedProject = new Project();
    this.getProjects();
  }

  setFormValues(form, project: Project){
    form.setValue({
      _id: project._id,
      name: project.name,
      description: project.description
    });
  }
}
