import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  providers: [UserService]
})
export class UserManagementComponent implements OnInit {

  public noData = true;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(res => {
      this.userService.users = res as User[];

      if(this.userService.users.length > 0){
        this.noData = false;
      }
    });
  }
}
