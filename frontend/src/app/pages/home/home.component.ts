import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { UploadService } from '../../services/upload.service';

declare const L: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProjectService]
})

export class HomeComponent implements OnInit {

  uploadedFiles: Array<File>;

  constructor(private authService: AuthService, private dataSharingService: DataSharingService, public projectService: ProjectService, private uploadService: UploadService) { }

  public isLogged: boolean = false;

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

    /*var mymap = L.map('map', {
      center: [39.46975, -0.37739],
      zoom: 10
    });

    var marker = L.marker([39.46975, -0.37739], { title: "Valencia" }).addTo(mymap);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(mymap);

    mymap.on('click', function(e) {        
      var popLocation= e.latlng;
      var popup = L.popup()
      .setLatLng(popLocation)
      .setContent('<p>Hello world!<br />This is a nice popup.</p>')
      .openOn(mymap);
      
      mymap.removeLayer(marker);
      marker = L.marker(popLocation).addTo(mymap);
      
      const Http = new XMLHttpRequest();
      const url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+popLocation.lat+"&lon="+popLocation.lng;
      Http.open("GET", url);
      Http.send();

      Http.onreadystatechange = (e) => {
        let coordData = JSON.parse(Http.responseText);
        console.log(coordData.address.county);
      }
    });*/
  }

  getCoordsData(lat: string, lon: string){
    const Http = new XMLHttpRequest();
    const url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+lat+"&lon="+lon;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }
  }

  getProjects(){
    this.projectService.getProjects().subscribe(res => {
      this.projectService.projects = res as Project[];
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
