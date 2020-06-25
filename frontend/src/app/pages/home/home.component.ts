import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    /*document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.carousel');
      var instances = M.Carousel.init(elems);
    });*/

    this.refreshNavbar();
  }

  refreshNavbar(): void {
    if(this.authService.loggedIn()){
      document.getElementById("logoutButton").style.display = "block";
    }else{
      document.getElementById("logoutButton").style.display = "none";
    }
  }

}
