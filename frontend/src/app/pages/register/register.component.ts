import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../interfaces/user';
import { Form } from '@angular/forms';
import { DataSharingService } from '../../services/data-sharing.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private dataSharingService: DataSharingService) { }
  
  public isLogged: boolean = false;

  ngOnInit(): void {
    /*document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.datepicker');
      var instances = M.Datepicker.init(elems);
    });*/
    this.checkLoggedUser();
    this.dataSharingService.currentLoggedUser.subscribe( isLogged => {
      this.isLogged = isLogged;
    });
  }

  onRegister(form): void{
    console.log("Register: ", form.value);
    this.authService.register(form.value).subscribe(res => {
      this.dataSharingService.changeLoggedUser(true);
      this.router.navigateByUrl("/");
    }, err => {
      console.log("Error: ", err);
    });
  }

  checkLoggedUser(): void {
    if(this.authService.loggedIn()){
      this.isLogged = true;
      this.router.navigateByUrl("/");
    }
  }

}
