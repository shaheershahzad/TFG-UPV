import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';

declare const M: any;

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
  providers: [ProjectService]
})
export class ProjectManagementComponent implements OnInit {

  constructor(public projectService: ProjectService) { }

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
    this.projectService.addProject(form.value).subscribe( res => {
      this.clearForm(form);
      M.toast({html: "Proyecto creado"});
      this.getProjects();
    }, ( err => {
      console.log("Error al crear el proyecto.");
    }));
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
