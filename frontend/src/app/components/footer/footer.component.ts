import { Component, OnInit } from '@angular/core';
import { AuthService } from'../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public isLogged: boolean;

  constructor(private authService: AuthService) { }

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

  subscribeEmail(){
    let email = "";
    email = (<HTMLInputElement> document.getElementById("newsletterEmailInput")).value.trim();
    if(email.length > 0 && email.indexOf("@") > 0){
      console.log(email);
    }else{
      console.log("Correo incorrecto");
    }
  }
}
