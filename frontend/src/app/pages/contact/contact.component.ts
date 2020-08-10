import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  checkPolicy(): boolean {

    let policyChecked = (<HTMLInputElement> document.getElementById("acceptPolicy")).checked;

    if(policyChecked){
      (<HTMLInputElement> document.getElementById("sendContactFormButton")).disabled = false;
    }else{
      (<HTMLInputElement> document.getElementById("sendContactFormButton")).disabled = true;
    }

    return policyChecked;
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

  sendContactForm() {

    let validationMessage = this.validateForm();
    if(validationMessage == "OK"){

      if(this.checkPolicy()){
        console.log("Message sent");
      }

    }else{

      M.toast({html: validationMessage});

    }

  }

}
