import { Component, OnInit } from '@angular/core';
import { AuthService } from'./services/auth.service';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Frontend";

  constructor(private titleService: Title, private authService: AuthService, private globals: Globals) { }

  ngOnInit(): void {
    if(location.href.indexOf("/backoffice") > 0){
      if(!this.authService.isSuperadmin() && !this.authService.isAdmin()){
        location.href = "/";
      }
    }

    this.title = this.globals.siteTitle;
  }
}
