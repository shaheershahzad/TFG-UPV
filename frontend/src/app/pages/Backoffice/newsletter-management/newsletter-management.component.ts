import { Component, OnInit } from '@angular/core';
import { NewsletterService } from '../../../services/newsletter.service';
import { Newsletter } from '../../../models/newsletter';

declare const M: any;

@Component({
  selector: 'app-newsletter-management',
  templateUrl: './newsletter-management.component.html',
  styleUrls: ['./newsletter-management.component.css'],
  providers: [NewsletterService]
})
export class NewsletterManagementComponent implements OnInit {

  constructor(public newsletterService: NewsletterService) { }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    });

    this.getSubscribers();
  }

  getSubscribers(){
    this.newsletterService.getSubscribers().subscribe(res => {
      this.newsletterService.subscribers = res as Newsletter[];
    });
  }

  showDeleteSubscriberConfirmation(id: string, email: string) {
    (<HTMLInputElement>document.querySelector('#subscriberID')).value = id;
    (<HTMLInputElement>document.querySelector('#subscriberEmailDelete')).innerText = email;
    document.getElementById("deleteSubscriberAction").click();
  }

  deleteSubscriber() {
    console.log("Deleting subscriber: "+(<HTMLInputElement>document.querySelector('#subscriberID')).value);
    this.newsletterService.deleteSubscriber((<HTMLInputElement>document.querySelector('#subscriberID')).value).subscribe( res => {
      M.toast({html: "Suscriptor borrado"});
      this.getSubscribers();
    }, ( err => {
      console.log("Error al borrar el suscriptor.");
    }));
  }

}
