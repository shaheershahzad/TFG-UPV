import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProjectService]
})

export class HomeComponent implements OnInit {

  uploadedFiles: Array<File>;
  public isLogged: boolean = false;
  public projectsAvailable: boolean = false;

  constructor(private authService: AuthService, private dataSharingService: DataSharingService, public projectService: ProjectService, private uploadService: UploadService) { }

  ngOnInit(): void {
    /*document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.carousel');
      var instances = M.Carousel.init(elems);
    });*/

    //this.refreshNavbar();
    this.dataSharingService.currentLoggedUser.subscribe( isLogged => {
      this.isLogged = isLogged;
    });

    this.getProjects();
  }

  getProjects(){
    this.projectService.getProjects().subscribe(res => {
      this.projectService.projects = res as Project[];

      if(this.projectService.projects.length > 0){
        this.projectsAvailable = true;
      }else{
        this.projectsAvailable = false;
      }
    });
  }

  refreshNavbar(): void {
    if(this.authService.loggedIn()){
      document.getElementById("logoutButton").style.display = "block";
    }else{
      document.getElementById("logoutButton").style.display = "none";
    }
  }

}
