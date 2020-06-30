import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../interfaces/user';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataSharingService } from '../../services/data-sharing.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private dataSharingService: DataSharingService, private formBuilder: FormBuilder) { }

  public isLogged: boolean = false;
  loginForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.checkLoggedUser();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    /*this.dataSharingService.currentLoggedUser.subscribe( isLogged => {
      this.isLogged = isLogged;
    });*/
    
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Detener si datos son incorrectos
    if (this.loginForm.invalid) {
        return;
    } else {
      this.onLogin(this.loginForm);
    }
  }

  onLogin(form): void{
    console.log("Login: ", form.value);
    this.authService.login(form.value).subscribe(res => {
      //this.router.navigateByUrl("/");
      //this.dataSharingService.changeLoggedUser(true);
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
