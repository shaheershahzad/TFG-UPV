import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../interfaces/user';
import { Form } from '@angular/forms';
import { DataSharingService } from '../../services/data-sharing.service';
import { ObjectUnsubscribedError } from 'rxjs';
//import * as M from 'materialize-css/dist/js/materialize';

declare const M: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    name: "",
    email: "",
    password: "",
    birthday: "",
    role: "registered",
    newsletter: true
  }

  constructor(private authService: AuthService, private router: Router, private dataSharingService: DataSharingService) { }
  
  public isLogged: boolean = false;

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function() {

      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var date = new Date(year - 18, month, day);

      var elems = document.querySelectorAll('.datepicker');
      var options = {
        autoClose: true,
        format: "dd/mm/yyyy",
        //defaultDate: date,
        //setDefaultDate: true,
        //minDate: date
      }
      var instances = M.Datepicker.init(elems, options);
    });
    this.checkLoggedUser();
    (<HTMLInputElement> document.getElementById("notifications")).checked = true;
    /*this.dataSharingService.currentLoggedUser.subscribe( isLogged => {
      this.isLogged = isLogged;
    });*/
  }

  onRegister(form): void{
    this.user.birthday = (<HTMLInputElement> document.getElementById("birthday")).value;
    form.setValue({
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      birthday: this.user.birthday,
      role: this.user.role,
      notifications: this.user.newsletter
    });
    this.authService.register(form.value).subscribe(res => {
      //this.dataSharingService.changeLoggedUser(true);
      //this.router.navigateByUrl("/");
      window.location.reload();
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
