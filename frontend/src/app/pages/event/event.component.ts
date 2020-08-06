import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public eventsAvailable: boolean = false;

  constructor(public eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
    this.eventService.getEvents().subscribe(res => {
      this.eventService.events = res as Event[];

      if(this.eventService.events.length > 0){
        this.eventsAvailable = true;
      }else{
        this.eventsAvailable = false;
      }
    });
  }

}
