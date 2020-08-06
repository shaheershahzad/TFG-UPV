import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
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

  constructor(public eventService: EventService) { }

  ngOnInit(): void {
    //Modals
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
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

    let _idEvent = new ObjectID().toString();
    let event = new Event(_idEvent, form.value.name, form.value.description, "","","");

    this.eventService.addEvent(event).subscribe( res => {

      this.clearForm(form);
      M.toast({html: "Evento creado"});
      this.getEvents();

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
    /*this.projectService.updateProject(form.value).subscribe( res => {

      if(this.uploadedFiles != undefined && this.uploadedFiles.length > 0){

        let updatedProjectId = form.value._id;
        let uid = this.authService.getUID();
        this.uploadFilesToServer(updatedProjectId, uid);
        this.clearForm(form);
        (<HTMLInputElement> document.getElementById("progressBarEdit")).style.display = "none";
        M.toast({html: "Proyecto actualizado"});

      }else{

        this.clearForm(form);
        (<HTMLInputElement> document.getElementById("progressBarEdit")).style.display = "none";
        M.toast({html: "Proyecto actualizado"});
        this.getProjects();

      }
      
    }, ( err => {
      console.log("Error al actualizar los datos del proyecto.");
    }));*/

  }

  setEventInfo(event: Event){
    (<HTMLInputElement> document.getElementById("nameDetail")).innerHTML = event.name.toString();
    (<HTMLInputElement> document.getElementById("descriptionDetail")).innerHTML = event.description.toString();
    (<HTMLInputElement> document.getElementById("locationDetail")).innerHTML = event.location.toString();
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
      description: event.description
    });
  }

}
