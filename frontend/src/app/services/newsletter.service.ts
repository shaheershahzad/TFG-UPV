import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Newsletter } from '../models/newsletter';

@Injectable({
  providedIn: 'root'
})

export class NewsletterService {

  readonly newsletterAPI = "http://localhost:3000/api/newsletter";
  selectedSubscriber: Newsletter;
  subscribers: Newsletter[];

  constructor(private httpClient: HttpClient) {
    this.selectedSubscriber = new Newsletter();
  }

  getSubscribers(){
    return this.httpClient.get(this.newsletterAPI);
  }

  addSubscriber(Subscriber: Newsletter){
    return this.httpClient.post(this.newsletterAPI, Subscriber);
  }

  updateSubscriber(subscriber: Newsletter){
    return this.httpClient.put(this.newsletterAPI + `/${subscriber._id}`, subscriber);
  }

  deleteSubscriber(_id: String){
    return this.httpClient.delete(this.newsletterAPI + `/${_id}`);
  }
}
