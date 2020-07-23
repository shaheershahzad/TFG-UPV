import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NewsletterService } from '../../services/newsletter.service';
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

  constructor(private authService: AuthService, 
    private router: Router, 
    private dataSharingService: DataSharingService,
    private newsletterService: NewsletterService) { }
  
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

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    });

    this.checkLoggedUser();
    (<HTMLInputElement> document.getElementById("notifications")).checked = true;
    /*this.dataSharingService.currentLoggedUser.subscribe( isLogged => {
      this.isLogged = isLogged;
    });*/
  }

  onRegister(form): void{

    let formMessage = this.registerFormValidation();

    if(formMessage == "OK"){

      this.user.birthday = (<HTMLInputElement> document.getElementById("birthday")).value;
      this.user.role = (<HTMLInputElement> document.getElementById("roleSelect")).value;
      
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

        if(form.value.notifications){
          this.newsletterService.addSubscriber(form.value.email).subscribe( res => {
            window.location.reload();
          });
        }

      }, err => {
        console.log("Error: ", err);
      });

      //console.log(form.value);

    }else{

      M.toast({html: formMessage});

    }
  }

  checkLoggedUser(): void {
    if(this.authService.loggedIn()){
      this.isLogged = true;
      this.router.navigateByUrl("/");
    }
  }

  registerFormValidation(): string{

    let name = (<HTMLInputElement> document.getElementById("name")).value.trim();
    let email = (<HTMLInputElement> document.getElementById("register_email")).value.trim();
    let password = (<HTMLInputElement> document.getElementById("password")).value.trim();
    let birthday = (<HTMLInputElement> document.getElementById("birthday")).value.trim();
    let role = (<HTMLInputElement> document.getElementById("roleSelect")).value.trim();
    //let notifications = (<HTMLInputElement> document.getElementById("notifications")).checked;

    if(name.length <= 1){
      return "Nombre incorrecto";
    }else if(email.length <= 3 || email.indexOf("@") <= 0){
      return "Correo incorrecto";
    }else if(password.length < 6){
      return "Contraseña incorrecta";
    }else if(birthday.length < 10){
      return "Fecha de nacimiento incorrecta";
    }else if(role.length <= 0){
      return "Tipo de usuario incorrecto";
    }

    return "OK";

  }

}
