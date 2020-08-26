import { Component, OnInit } from '@angular/core';
import { AuthService } from'./services/auth.service';
import { Title, Meta } from '@angular/platform-browser';
import { WebdataService } from './services/webdata.service';
import { title } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Vicente Berenguer | ONG";
  metaTitle = title;
  metaDescription = "La página web de la ONG del sacerdote Vicente Berenguer. Colabora con nosotros y ayuda a las personas más desfavorecidas.";
  webdata: any;

  constructor(private titleService: Title, private metaService: Meta, private authService: AuthService, private webdataService: WebdataService) { }

  ngOnInit(): void {
    if(location.href.indexOf("/backoffice") > 0){
      if(!this.authService.isSuperadmin() && !this.authService.isVolunteer()){
        location.href = "/";
      }
    }

    this.getWebdata(); 
  }

  getWebdata(){

    this.webdataService.getWebdata().subscribe( res => {
      //console.log(res[0]);
      this.title = res[0].websiteTitle;
      this.metaTitle = res[0].websiteMetaTitle;
      this.metaDescription = res[0].websiteMetaDescription;

      this.titleService.setTitle(this.title);
      this.metaService.updateTag({ name: 'title', content: this.metaTitle });
      this.metaService.updateTag({ name: 'description', content: this.metaDescription });
    }, err => {

    });

  }
}
