import { Component, OnInit } from '@angular/core';
import { AuthService } from'../../services/auth.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isUserLoggedIn: boolean;
  public isLogged: boolean;

  constructor(private authService: AuthService, private router: Router, private dataSharingService: DataSharingService) {
    /*this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
    });*/

  }

  ngOnInit(): void {
    //this.onCheckUser();
    this.dataSharingService.currentLoggedUser.subscribe( isLogged => {
      this.isLogged = isLogged;
    });
  }

  logout(){
    this.authService.logout();
    //this.router.navigateByUrl("/");
    //window.location.reload();
    this.dataSharingService.changeLoggedUser(false);
  }

  onCheckUser(): void {
    if(this.authService.loggedIn()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

}
