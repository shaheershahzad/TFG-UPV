import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';

declare const M: any;

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  public projectName = "";
  public projectDescription = "";
  public projectLocation = "";

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {

    this.getProjectDetails(this.activatedRoute.snapshot.params.id);

  }

  getProjectDetails(id: string) {

    this.projectService.getProjectDetails(id).subscribe( res => {
      let response = JSON.parse(JSON.stringify(res));
      this.projectName = response.name;
      this.projectDescription = response.description;
      this.projectLocation = response.location;
    }, err => {
      M.toast({html: "Proyecto no encontrado."});
    });

  }

}
