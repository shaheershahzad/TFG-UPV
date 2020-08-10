import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  readonly mailAPI = "http://localhost:3000/api/mailer";
  //readonly mailAPI = "/api/mailer";

  constructor(private httpClient: HttpClient) {
  }

  sendContactMessage(mailData){
    return this.httpClient.post(this.mailAPI+"/send-contact-form", mailData);
  }

  sendWelcomeEmail(mailData){
    return this.httpClient.post(this.mailAPI+"/welcome-email", mailData);
  }

  sendProjectCreated(mailData){
    return this.httpClient.post(this.mailAPI+"/send-project-created", mailData);
  }

  sendEventCreated(mailData){
    return this.httpClient.post(this.mailAPI+"/send-event-created", mailData);
  }

  sendNewsCreated(mailData){
    return this.httpClient.post(this.mailAPI+"/send-news-created", mailData);
  }

  sendBroadcast(mailData){
    return this.httpClient.post(this.mailAPI+"/send-broadcast", mailData);
  }

}
