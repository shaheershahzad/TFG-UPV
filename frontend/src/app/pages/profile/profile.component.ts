import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user = {
    name: "Test",
    email: "Test Email",
    dateOfBirth: "11/11/1111",
    role: "Test role"
  }

  constructor(public userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {

  }

  getUserInfo(){
    
  }

}
