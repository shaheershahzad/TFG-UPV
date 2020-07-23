import { Component, OnInit } from '@angular/core';
import { AuthService } from'../../services/auth.service';
import { NewsletterService } from'../../services/newsletter.service';
import { Newsletter } from 'src/app/models/newsletter';

declare const M: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public isLogged: boolean = false;
  public subscriber: boolean = false;

  constructor(private authService: AuthService, public newsletterService: NewsletterService) { }

  ngOnInit(): void {
    this.onCheckUser();
    this.checkNewsletter();
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

  checkNewsletter(){
    if(this.isLogged){
      
    }
  }

  addSubscriber(form){
    
    let email = this.validateEmail();

    if(email == "OK"){      
      this.newsletterService.addSubscriber(form.value).subscribe( res => {
        M.toast({html: "Correo registrado correctamente"});
        form.resetForm();
      }, err => {
        M.toast({html: "El correo ya está registrado"})
        console.log("Error al añadir suscriptor");
      });
    }else{
      M.toast({html: email});
    }
  }

  validateEmail(): string{
    
    let email = (<HTMLInputElement> document.getElementById("newsletterEmailInput")).value.trim();

    if(email.length > 0 && email.indexOf("@") > 0){
      return "OK";
    }else{
      return "Correo incorrecto";
    }

  }

}
