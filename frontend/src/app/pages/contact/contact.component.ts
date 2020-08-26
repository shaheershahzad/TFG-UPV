import { Component, OnInit } from '@angular/core';
import { MailService } from '../../services/mail.service';

declare const M: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private mailService: MailService) { }

  ngOnInit(): void {
  }

  checkPolicy() {

    let policyChecked = (<HTMLInputElement> document.getElementById("acceptPolicy")).checked;

    if(policyChecked){
      (<HTMLInputElement> document.getElementById("sendContactFormButton")).disabled = false;
    }else{
      (<HTMLInputElement> document.getElementById("sendContactFormButton")).disabled = true;
    }

  }

  validateForm(): string{

    let name = (<HTMLInputElement> document.getElementById("name")).value.trim();
    let email = (<HTMLInputElement> document.getElementById("email")).value.trim();
    let subject = (<HTMLInputElement> document.getElementById("subject")).value.trim();
    let message = (<HTMLInputElement> document.getElementById("message")).value.trim();

    if(email.length <= 3 || email.indexOf("@") <= 0){
      return "Correo incorrecto";
    }else if(name.length <= 1){
      return "Nombre incorrecto";
    }else if(subject.length <= 1){
      return "Asunto no válido";
    }else if(message.length == 0){
      return "Mensaje vacío";
    }

    return "OK";
  }

  sendContactForm(form) {

    let validationMessage = this.validateForm();
    if(validationMessage == "OK"){

      if((<HTMLInputElement> document.getElementById("acceptPolicy")).checked){

        this.mailService.sendContactMessage(form.value).subscribe( res => {
          M.toast({html: "Mensaje enviado"});
        });

      }else{

        M.toast({html: "No ha aceptado la política"});

      }

    }else{

      M.toast({html: validationMessage});

    }

  }

}
