import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../../services/donation.service';
import { UserService } from '../../../services/user.service';
import { ProjectService } from '../../../services/project.service';
import { Donation } from '../../../models/donation';
import { User } from '../../../models/user';
import { Project } from '../../../models/project';
import { ObjectID } from 'bson';

declare const M: any;

@Component({
  selector: 'app-donation-management',
  templateUrl: './donation-management.component.html',
  styleUrls: ['./donation-management.component.css']
})
export class DonationManagementComponent implements OnInit {

  public donationsAvailable: boolean = false;

  constructor(public donationService: DonationService, public userService: UserService, public projectService: ProjectService) { }

  ngOnInit(): void {

    //Modals
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    });

    //Datepicker
    document.addEventListener('DOMContentLoaded', function() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var date = new Date(year - 18, month, day);

      var elems = document.querySelectorAll('.datepicker');
      var options = {
        autoClose: true,
        format: "dd/mm/yyyy",
        //defaultDate: date,
        //setDefaultDate: true,
        //minDate: date
      }
      var instances = M.Datepicker.init(elems, options);
    });

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    });

    this.getDonations();
    this.getUsers();
    this.getProjects();

  }

  getDonations(){
    this.donationService.getDonations().subscribe(res => {
      this.donationService.donations = res as Donation[];

      if(this.donationService.donations.length > 0){
        this.donationsAvailable = true;
      }else{
        this.donationsAvailable = false;
      }
    });
  }

  getUsers(){
    this.userService.getUsers().subscribe(res => {
      this.userService.users = res as User[];
      //console.log(this.appUsers);
    });
  }

  getProjects(){
    this.projectService.getProjects().subscribe(res => {
      this.projectService.projects = res as Project[];
      //console.log(this.appProjects);
    });
  }

  addDonation(form): void{

    let formMessage = this.addFormValidation();

    if(formMessage == "OK"){

      //form.value.paymentDate = (<HTMLInputElement> document.getElementById("paymentDateAdd")).value;
      //console.log(form.value);
      form.value.paymentDate = (<HTMLInputElement> document.getElementById("paymentDateAdd")).value;
      let _idDonation = new ObjectID().toString();
      let donation = new Donation(_idDonation, form.value.donerId, form.value.amount, form.value.projectId, form.value.paymentMethod, form.value.paymentDate);

      this.donationService.addDonation(donation).subscribe( res => {

        this.clearForm(form);
        M.toast({html: "Donación creada"});
        this.getDonations();

      }, ( err => {
        console.log("Error al crear la donación.");
      }));

    }else{

      M.toast({html: formMessage});

    }

  }

  viewDonationDetails(donation: Donation) {
    this.setDonationInfo(donation);
  }

  editDonation(form, donation: Donation) {
    this.setFormValues(form, donation);
  }

  updateDonation(form) {


    let formMessage = this.editFormValidation();

    if(formMessage == "OK"){

      //console.log(form.value);

      this.donationService.updateDonation(form.value).subscribe( res => {

        this.clearForm(form);
        M.toast({html: "Donación actualizada"});
        this.getDonations();
        
      }, ( err => {
        console.log("Error al actualizar los datos de la donación.");
      }));

    }else{

      M.toast({html: formMessage});

    }

  }

  setDonationInfo(donation: Donation){
    (<HTMLInputElement> document.getElementById("donerIdDetail")).innerHTML = donation.donerId.toString();
    (<HTMLInputElement> document.getElementById("amountDetail")).innerHTML = donation.amount.toString()+" €";
    (<HTMLInputElement> document.getElementById("projectIdDetail")).innerHTML = donation.projectId.toString();
    (<HTMLInputElement> document.getElementById("paymentMethodDetail")).innerHTML = donation.paymentMethod.toString();
    (<HTMLInputElement> document.getElementById("paymentDateDetail")).innerHTML = donation.paymentDate.toString();
  }

  showDeleteDonationConfirmation(id: string, donerId: string) {
    (<HTMLInputElement>document.querySelector('#donationID')).value = id;
    (<HTMLInputElement>document.querySelector('#donationDonerIdDelete')).innerText = donerId;
    document.getElementById("deleteDonationAction").click();
  }

  deleteDonation() {

    let donationId = (<HTMLInputElement>document.querySelector('#donationID')).value;
    this.donationService.deleteDonation(donationId).subscribe( res => {

        M.toast({html: "Donación borrada"});
        this.getDonations(); 

    }, ( err => {
      console.log("Error al borrar la donación.");
    }));

  }

  clearForm(form) {
    form.resetForm();
    this.donationService.selectedDonation = new Donation();
    this.getDonations();
  }

  setFormValues(form, donation: Donation){
    form.resetForm();
    form.setValue({
      _id: donation._id,
      donerId: donation.donerId,
      amount: donation.amount,
      projectId: donation.projectId,
      paymentMethod: donation.paymentMethod,
      paymentDate: donation.paymentDate
    });

    //let date = event.date.split("/");
    //this.changeDate(date[0], date[1], date[2]);
  }

  addFormValidation(): string{

    let donerId = (<HTMLInputElement> document.getElementById("donerIdAdd")).value.trim();
    let amount = (<HTMLInputElement> document.getElementById("amountAdd")).value.trim();
    let projectId = (<HTMLInputElement> document.getElementById("projectIdAdd")).value.trim();
    let paymentMethod = (<HTMLInputElement> document.getElementById("paymentMethodAdd")).value.trim();
    let paymentDate = (<HTMLInputElement> document.getElementById("paymentDateAdd")).value.trim();

    if(donerId.length <= 0){
      return "Donante incorrecto";
    }else if(amount.length <= 0){
      return "Falta el importe a donar";
    }else if(projectId.length <= 0){
      return "Proyecto incorrecto";
    }else if(paymentMethod.length <= 0){
      return "Falta un método de pago";
    }else if(paymentDate.length <= 0){
      return "Falta la fecha del pago";
    }

    return "OK";
    
  }

  editFormValidation(): string{

    let donerId = (<HTMLInputElement> document.getElementById("donerIdEdit")).value.trim();
    let amount = (<HTMLInputElement> document.getElementById("amountEdit")).value.trim();
    let projectId = (<HTMLInputElement> document.getElementById("projectIdEdit")).value.trim();
    let paymentMethod = (<HTMLInputElement> document.getElementById("paymentMethodEdit")).value.trim();
    let paymentDate = (<HTMLInputElement> document.getElementById("paymentDateEdit")).value.trim();

    if(donerId.length <= 0){
      return "Donante incorrecto";
    }else if(amount.length <= 0){
      return "Falta el importe a donar";
    }else if(projectId.length <= 0){
      return "Proyecto incorrecto";
    }else if(paymentMethod.length <= 0){
      return "Falta un método de pago";
    }else if(paymentDate.length <= 0){
      return "Falta la fecha del pago";
    }

    return "OK";
    
  }

  /*changeDate(day, month, year) {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('#dateEdit');
      var options = {
        autoClose: true,
        format: "dd/mm/yyyy",
        defaultDate: new Date(year+"-"+month+"-"+day),
        setDefaultDate: true
        //minDate: date
      }
      var instances = M.Datepicker.init(elems, options);
    });

    (<HTMLInputElement> document.getElementById("dateEdit")).value = day+"/"+month+"/"+year;

  }*/

}
