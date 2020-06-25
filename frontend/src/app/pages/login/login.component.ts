import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../interfaces/user';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  public isLogged: boolean = false;

  ngOnInit(): void {
    this.checkLoggedUser();
  }

  onLogin(form): void{
    console.log("Login: ", form.value);
    this.authService.login(form.value).subscribe(res => {
      console.log("Exito");
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
