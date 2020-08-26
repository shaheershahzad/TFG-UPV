import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

declare const M: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user = {
    name: "User's name",
    email: "User's email",
    birthday: "User's date of birth",
    role: "User's role"
  }

  constructor(public userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(){
    let userId = this.authService.getUID();

    this.authService.getProfileData(userId).subscribe((res: any) => {

      this.user = {
        name: res.name,
        email: res.email,
        birthday: res.birthday,
        role: res.role
      }

    }, err => {

      M.toast({html: "Usuario no encontrado"});

    });

    /*this.userService.getUser(userId).subscribe( res => {

      console.log(res);
      this.user = JSON.parse(JSON.stringify(res));
      console.log(this.user);

    }, err => {
      M.toast({html: "Usuario no encontrado"});
    });*/
  }

}
