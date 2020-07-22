import { Component, OnInit } from '@angular/core';
import { AuthService } from'./services/auth.service';
import{ GlobalConstants } from './common/global-variables';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = GlobalConstants.siteTitle;

  constructor(private titleService: Title, private authService: AuthService) { }

  ngOnInit(): void {
    if(location.href.indexOf("/backoffice") > 0){
      if(!this.authService.isSuperadmin()){
        location.href = "/";
      }
    }

    this.titleService.setTitle(this.title);
  }
}
