import { Component, OnInit } from '@angular/core';
import { AuthService } from'../../services/auth.service';
import { NewsletterService } from'../../services/newsletter.service';
import { Newsletter } from 'src/app/models/newsletter';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public isLogged: boolean;

  constructor(private authService: AuthService, public newsletterService: NewsletterService) { }

  ngOnInit(): void {
    this.onCheckUser();
    let date = new Date();
    let year = date.getFullYear();
    document.getElementById("copyright-year").innerHTML = year.toString();
  }

  onCheckUser(): void {
    if(this.authService.loggedIn()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  addSubscriber(){
    let email = "";
    email = (<HTMLInputElement> document.getElementById("newsletterEmailInput")).value.trim();
    if(email.length > 0 && email.indexOf("@") > 0){
      let subscriber = {
        email: email
      }

      let formBuilder = new FormBuilder();
      formBuilder.group({
        email: email
      });
      console.log(formBuilder.control["email"].value);
      
      /*this.newsletterService.addSubscriber(formBuilder.control["email"].value).subscribe( res => {
        console.log(email);
      }, err => {
        console.log("Error al añadir suscriptor");
      });*/
    }else{
      console.log("Correo incorrecto");
    }
  }
}
