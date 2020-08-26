import { Component, OnInit } from '@angular/core';
import { AuthService } from'../../../services/auth.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
export class BackofficeComponent implements OnInit {

  public isSuperadmin: boolean = false;
  public isVolunteer: boolean = false;
  public isRegistered: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.onCheckUser();
  }

  onCheckUser(): void {

    if(this.authService.isSuperadmin()){
      this.isSuperadmin = true;
    }else if(this.authService.isVolunteer()){
      this.isVolunteer = true;
    }else if(this.authService.isRegistered()){
      this.isRegistered = true;
    }

  }

}
