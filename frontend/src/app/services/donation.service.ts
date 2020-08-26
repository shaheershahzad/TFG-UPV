import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Donation } from '../models/donation';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  readonly donationAPI = "http://localhost:3000/api/donations";
  //readonly donationAPI = "/api/donations";
  selectedDonation: Donation;
  donations: Donation[];
  userDonations: Donation[];

  constructor(private httpClient: HttpClient) {
    this.selectedDonation = new Donation();
  }

  getDonations(){
    return this.httpClient.get(this.donationAPI);
  }

  getUserDonations(_id: String){
    return this.httpClient.get(this.donationAPI + `/user-donations/${_id}`);
  }

  getDonation(_id: String){
    return this.httpClient.get(this.donationAPI + `/donation-details/${_id}`);
  }

  addDonation(donation: Donation){
    return this.httpClient.post(this.donationAPI, donation);
  }

  updateDonation(donation: Donation){
    return this.httpClient.put(this.donationAPI + `/${donation._id}`, donation);
  }

  deleteDonation(_id: String){
    return this.httpClient.delete(this.donationAPI + `/${_id}`);
  }
}
