import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../interfaces/user';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataSharingService } from '../../services/data-sharing.service';

declare const M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, 
    private router: Router, 
    private dataSharingService: DataSharingService, 
    private formBuilder: FormBuilder) { }

  public isLogged: boolean = false;
  loginForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.checkLoggedUser();
    /*this.dataSharingService.currentLoggedUser.subscribe( isLogged => {
      this.isLogged = isLogged;
    });*/
    
  }

  onLogin(form): void{
    
    let formMessage = this.loginFormValidation();

    if(formMessage == "OK"){

      this.authService.login(form.value).subscribe(res => {
        //this.router.navigateByUrl("/");
        //this.dataSharingService.changeLoggedUser(true);
        //window.location.reload();
      }, err => {
        console.log("Error: ", err);
      });

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

  loginFormValidation(): string{

    let email = (<HTMLInputElement> document.getElementById("login_email")).value.trim();
    let password = (<HTMLInputElement> document.getElementById("password")).value.trim();

    if(email.length <= 3 || email.indexOf("@") <= 0){
      return "Correo incorrecto";
    }else if(password.length < 6){
      return "Contraseña incorrecta";
    }

    return "OK";
    
  }

}
