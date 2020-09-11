import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MailService } from '../../services/mail.service';
import { NewsletterService } from '../../services/newsletter.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { ObjectUnsubscribedError } from 'rxjs';
import { Newsletter } from 'src/app/models/newsletter';
//import * as M from 'materialize-css/dist/js/materialize';
import { ObjectID } from 'bson';
import { User } from 'src/app/models/user';

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
    private newsletterService: NewsletterService,
    private mailService: MailService) { }
  
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
      //this.user.role = (<HTMLInputElement> document.getElementById("roleSelect")).value;
      
      form.setValue({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        birthday: this.user.birthday,
        //role: this.user.role,
        notifications: this.user.newsletter
      });

      let _idUser = new ObjectID().toString();
      let user = new User(_idUser, form.value.name, form.value.email, form.value.password, this.user.role, form.value.birthday, form.value.notifications);

      //console.log(newSubscriber);
      //console.log(user);

      this.authService.register(user).subscribe(res => {
        //this.dataSharingService.changeLoggedUser(true);
        //this.router.navigateByUrl("/");

        let receiverName = this.user.name;
        let receiverEmail = this.user.email;
        this.mailService.sendWelcomeEmail({name: receiverName, to: receiverEmail}).subscribe(res => {

          if(form.value.notifications){

            let _idSubscriber = new ObjectID().toString();
            let newSubscriber = new Newsletter(_idSubscriber, this.user.email);
  
            this.newsletterService.addSubscriber(newSubscriber).subscribe( res => {
              console.log("Registered completed with all");
              
              this.mailService.sendSubscriptionEmail({name: receiverName, to: receiverEmail}).subscribe(res => {
                window.location.reload();
              });
        
            }, err => {
              console.log("Error al suscribir el correo: ", err);
            });
          }else{
            window.location.reload();
          }

        });

      }, err => {
        if(err.status == 409){
          M.toast({html: "El correo ya existe"});
        }else if(err.status == 500){
          M.toast({html: "Error de conexión con el servidor"});
        }
        console.log("Error al registrar: ", err);
      });

      //console.log(form.value);

    }else{

      M.toast({html: formMessage});

    }
  }

  /*sendRegistrationMail(receiverName: string, receiverEmail: string){
    this.mailService.sendWelcomeEmail({name: receiverName, to: receiverEmail});
  }

  sendSubscriptionMail(receiverName: string, receiverEmail: string){
    this.mailService.sendSubscriptionEmail({name: receiverName, to: receiverEmail});
  }*/

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
    //let role = (<HTMLInputElement> document.getElementById("roleSelect")).value.trim();
    //let notifications = (<HTMLInputElement> document.getElementById("notifications")).checked;

    if(name.length <= 1){
      return "Nombre incorrecto";
    }else if(email.length <= 3 || email.indexOf("@") <= 0){
      return "Correo incorrecto";
    }else if(password.length < 6){
      return "Contraseña incorrecta";
    }else if(birthday.length < 10){
      return "Fecha de nacimiento incorrecta";
    }/*else if(role.length <= 0){
      return "Tipo de usuario incorrecto";
    }*/

    return "OK";

  }

}
