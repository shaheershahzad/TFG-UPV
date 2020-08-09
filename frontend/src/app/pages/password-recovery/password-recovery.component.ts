import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

declare const M: any;

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  resetPassword(){
    let email = (<HTMLInputElement> document.getElementById("recoveryEmail")).value.trim();
    let password = (<HTMLInputElement> document.getElementById("newPassword")).value;

    if(email.length > 0){

      this.authService.resetPassword(email, password).subscribe( res => {

        this.userService.updatePassword(email, password).subscribe( res => {
          window.location.href = "/login";
        }, err => {
          M.toast({html: "Error al actualizar la contraseña"});
        });
  
      }, ( err => {
        console.log("Error al actualizar la contraseña");
      }));

    }

  }

}
