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
      console.log(res);
    });
  }

  addProject(form): void{
    console.log(form.value);
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
    document.getElementById("addProjectAction").click();
  }

  editProject(project: Project) {
    this.projectService.selectedProject = project;
    (<HTMLInputElement>document.querySelector('#addProjectButton')).innerText = "Actualizar";
    document.getElementById("addProjectAction").click();
  }

  deleteProject(id: String) {
    console.log(id);
  }

  clearForm(form) {
    form.reset();
    this.projectService.selectedProject = new Project();
  }

  setFormValues(form, project: Project){
    form.setValue({
      name: project.name,
      description: project.description
    });
  }
}
