import { Component, OnInit } from '@angular/core';
import { AuthService } from'../../services/auth.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';

declare const M: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isUserLoggedIn: boolean;
  public isLogged: boolean;
  public isSuperadmin: boolean = false;
  public isAdmin: boolean = false;
  public isRegistered: boolean = false;
  public name: string = "Usuario";

  constructor(private authService: AuthService, private router: Router, private dataSharingService: DataSharingService) {
    /*this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
    });*/

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems, {hover: false});

      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });

  }

  ngOnInit(): void {
    this.onCheckUser();
    /*this.dataSharingService.currentLoggedUser.subscribe( isLogged => {
      this.isLogged = isLogged;
    });*/
  }

  logout(){
    this.authService.logout();
    //this.router.navigateByUrl("/");
    this.isLogged = false;
    window.location.reload();
    //this.dataSharingService.changeLoggedUser(false);
  }

  onCheckUser(): void {
    if(this.authService.loggedIn()){
      this.isLogged = true;

      //Se obtiene el nombre de usuario y se pone en el menú horizontal
      let userName =  this.authService.getName().split(" ");
      //(<HTMLInputElement> document.getElementById("username")).innerHTML = userName.length > 1 ? userName[0]+" "+userName[1] : userName[0];
      this.name = userName.length > 1 ? userName[0]+" "+userName[1] : userName[0];
    }else{
      this.isLogged = false;
    }

    if(this.authService.isSuperadmin()){
      this.isSuperadmin = true;
    }else if(this.authService.isAdmin()){
      this.isAdmin = true;
    }else if(this.authService.isRegistered()){
      this.isRegistered = true;
    }

  }

}
