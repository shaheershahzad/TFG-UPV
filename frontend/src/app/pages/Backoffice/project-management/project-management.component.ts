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
      var options = {
        onCloseEnd: function(){
          (<HTMLInputElement>document.querySelector('#projectFormButton')).style.display = "block";
          (<HTMLInputElement>document.querySelector('#projectFormButton')).innerText = "Añadir";
        }
      }
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, options);
    });

    this.getProjects();
  }

  getProjects(){
    this.projectService.getProjects().subscribe(res => {
      this.projectService.projects = res as Project[];
      console.log(res);
    });
  }

  addProject(form): void{
    console.log(form.value);
    (<HTMLInputElement>document.querySelector('#modalTitle')).innerText = "Añadir Proyecto";
    (<HTMLInputElement>document.querySelector('#projectFormButton')).innerText = "Añadir";
    this.projectService.addProject(form.value).subscribe( res => {
      this.clearForm(form);
      M.toast({html: "Project saved"});
      this.getProjects();
      console.log(res);
    });
  }

  viewProjectDetails(form, project: Project) {
    this.projectService.selectedProject = project;
    //this.setFormValues(form, project);
    (<HTMLInputElement>document.querySelector('#modalTitle')).innerText = "Detalles Proyecto";
    (<HTMLInputElement>document.querySelector('#projectFormButton')).style.display = "none";
    document.getElementById("addProjectAction").click();
  }

  editProject(project: Project) {
    this.projectService.selectedProject = project;
    (<HTMLInputElement>document.querySelector('#modalTitle')).innerText = "Actualizar Proyecto";
    (<HTMLInputElement>document.querySelector('#projectFormButton')).innerText = "Actualizar";
    document.getElementById("addProjectAction").click();
  }

  showDeleteProjectConfirmation(id: String) {
    document.getElementById("deleteProjectAction").click();
  }

  deleteProject(id: String) {
    console.log(id);
  }

  clearForm(form) {
    form.reset();
    this.projectService.selectedProject = new Project();
    (<HTMLInputElement>document.querySelector('#projectFormButton')).innerText = "Añadir";
    (<HTMLInputElement>document.querySelector('#projectFormButton')).style.display = "block";
    this.getProjects();
  }

  setFormValues(form, project: Project){
    form.setValue({
      name: project.name,
      description: project.description
    });
  }
}
