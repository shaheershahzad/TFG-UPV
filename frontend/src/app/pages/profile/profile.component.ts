import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { DonationService } from '../../services/donation.service';
import { Donation } from '../../models/donation';

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

  public isDoner: boolean = false;
  public hasDonations: boolean = false;

  constructor(public userService: UserService, private authService: AuthService, public donationService: DonationService) { }

  ngOnInit(): void {

    //Desplegable donaciones
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems);
    });

    this.getUserInfo();
    this.getUserDonations();
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

      if(this.user.role == "doner"){
        this.isDoner = true;
      }else{
        this.isDoner = false;
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

  getUserDonations(){
    let userId = this.authService.getUID();

    this.donationService.getUserDonations(userId).subscribe(res => {
      this.donationService.donations = res as Donation[];
      if(this.donationService.donations.length <= 0){
        //(<HTMLInputElement> document.getElementById("donationsSegment")).style.display = "none";
        this.hasDonations = false;
      }else{
        this.hasDonations = true;
      }
    });
  }

}
