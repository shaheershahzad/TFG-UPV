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
  public currentDate = "01/01/2000";

  constructor(public eventService: EventService) { }

  ngOnInit(): void {
    this.getCurrentDate();
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

  getCurrentDate(): string {
    let date = new Date()

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    if(day < 10){
      if(month < 10){
        this.currentDate = `0${day}/0${month}/${year}`;
      }else{
        this.currentDate = `${day}/${month}/${year}`;
      }
    }else{
      if(month < 10){
        this.currentDate = `${day}/0${month}/${year}`;
      }else{
        this.currentDate = `${day}/${month}/${year}`;
      }
    }

    return this.currentDate;
  }

}
