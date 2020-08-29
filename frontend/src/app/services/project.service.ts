import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  readonly projectAPI = "http://localhost:3000/api/projects";
  //readonly projectAPI = "/api/projects";
  selectedProject: Project;
  projects: Project[];

  constructor(private httpClient: HttpClient) {
    this.selectedProject = new Project();
  }

  getProjects(){
    return this.httpClient.get(this.projectAPI);
  }

  addProject(project: Project){
    return this.httpClient.post(this.projectAPI, project);
  }

  updateProject(project: Project){
    return this.httpClient.put(this.projectAPI + `/${project._id}`, project);
  }

  checkVolunteer(project: String, volunteer: String){
    return this.httpClient.get(this.projectAPI+ `${project}/volunteers/${volunteer}`);
  }

  addVolunteer(_id: String, volunteer){
    //console.log(volunteer);
    return this.httpClient.put(this.projectAPI + `/volunteer/add/${_id}`, volunteer);
  }

  removeVolunteer(_id: String, volunteer){
    return this.httpClient.put(this.projectAPI + `/volunteer/remove/${_id}`, volunteer);
  }

  deleteProject(_id: String){
    return this.httpClient.delete(this.projectAPI + `/${_id}`);
  }

  getProjectDetails(_id: String){
    return this.httpClient.get(this.projectAPI + `/project/details/${_id}`);
  }
}
