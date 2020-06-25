import { Component, OnInit } from '@angular/core';
import { AuthService } from'../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  public isLogged: boolean = false;

  ngOnInit(): void {
    /*if(this.authService.loggedIn()){
      console.log("Logged in");
      document.getElementById("logoutButton").style.display = "block";
    }else{
      console.log("Logged out");
    }*/
    this.onCheckUser();
  }

  logout(){
    this.authService.logout();
    //this.router.navigateByUrl("/");
    window.location.reload();
  }

  onCheckUser(): void {
    if(this.authService.loggedIn()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

}
