import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  readonly eventAPI = "http://localhost:3000/api/events";
  //readonly eventAPI = "/api/events";
  selectedEvent: Event;
  events: Event[];

  constructor(private httpClient: HttpClient) {
    this.selectedEvent = new Event();
  }

  getEvents(){
    return this.httpClient.get(this.eventAPI);
  }

  addEvent(event: Event){
    return this.httpClient.post(this.eventAPI, event);
  }

  updateEvent(event: Event){
    return this.httpClient.put(this.eventAPI + `/${event._id}`, event);
  }

  deleteEvent(_id: String){
    return this.httpClient.delete(this.eventAPI + `/${_id}`);
  }

  getEventDetails(_id: String){
    return this.httpClient.get(this.eventAPI + `/event-details/${_id}`);
  }
}
