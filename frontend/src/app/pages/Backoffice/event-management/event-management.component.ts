import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { MailService } from '../../../services/mail.service';
import { NewsletterService } from '../../../services/newsletter.service';
import { Event } from '../../../models/event';
import { ObjectID } from 'bson';

declare const M: any;

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {

  public eventsAvailable: boolean = false;

  constructor(public eventService: EventService, private newsletterService: NewsletterService, private mailService: MailService) { }

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

    //Timepicker
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.timepicker');
      var instances = M.Timepicker.init(elems);
    });

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

  addEvent(form): void{

    form.value.date = (<HTMLInputElement> document.getElementById("dateAdd")).value;
    form.value.time = (<HTMLInputElement> document.getElementById("timeAdd")).value;
    //console.log(form.value);
    let _idEvent = new ObjectID().toString();
    let event = new Event(_idEvent, form.value.name, form.value.description, form.value.location, form.value.date, form.value.time);

    this.eventService.addEvent(event).subscribe( res => {

      this.newsletterService.getSubscribers().subscribe( (res: any) => {

        let newsletterUsers = res;
        //console.log(newsletterUsers);

        this.mailService.sendEventCreated({subject: "Evento nuevo", subscribers: newsletterUsers}).subscribe( res => {
          this.clearForm(form);
          M.toast({html: "Evento creado"});
          this.getEvents();
        });

      });

    }, ( err => {
      console.log("Error al crear el evento.");
    }));

  }

  viewEventDetails(event: Event) {
    this.setEventInfo(event);
  }

  editEvent(form, event: Event) {
    this.setFormValues(form, event);
  }

  updateEvent(form) {

    console.log(form.value);
    this.eventService.updateEvent(form.value).subscribe( res => {

      this.clearForm(form);
      M.toast({html: "Evento actualizado"});
      this.getEvents();
      
    }, ( err => {
      console.log("Error al actualizar los datos del evento.");
    }));

  }

  setEventInfo(event: Event){
    (<HTMLInputElement> document.getElementById("nameDetail")).innerHTML = event.name.toString();
    (<HTMLInputElement> document.getElementById("descriptionDetail")).innerHTML = event.description.toString();
    (<HTMLInputElement> document.getElementById("locationDetail")).innerHTML = event.location.toString();
    (<HTMLInputElement> document.getElementById("dateDetail")).innerHTML = event.date.toString();
    (<HTMLInputElement> document.getElementById("timeDetail")).innerHTML = event.time.toString();
  }

  showDeleteEventConfirmation(id: string, name: string) {
    (<HTMLInputElement>document.querySelector('#eventID')).value = id;
    (<HTMLInputElement>document.querySelector('#eventNameDelete')).innerText = name;
    document.getElementById("deleteEventAction").click();
  }

  deleteEvent() {

    let eventId = (<HTMLInputElement>document.querySelector('#eventID')).value;
    this.eventService.deleteEvent(eventId).subscribe( res => {

        M.toast({html: "Evento borrado"});
        this.getEvents(); 

    }, ( err => {
      console.log("Error al borrar el evento.");
    }));

  }

  clearForm(form) {
    form.resetForm();
    this.eventService.selectedEvent = new Event();
    this.getEvents();
  }

  setFormValues(form, event: Event){
    form.resetForm();
    form.setValue({
      _id: event._id,
      name: event.name,
      description: event.description,
      location: event.location,
      date: event.date,
      time: event.time
    });

    let date = event.date.split("/");
    this.changeDate(date[0], date[1], date[2]);
  }

  changeDate(day, month, year) {
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

  }

}
