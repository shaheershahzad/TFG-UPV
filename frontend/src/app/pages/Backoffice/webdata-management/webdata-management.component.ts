import { Component, OnInit } from '@angular/core';
import { WebdataService } from '../../../services/webdata.service';

declare const M: any;

@Component({
  selector: 'app-webdata-management',
  templateUrl: './webdata-management.component.html',
  styleUrls: ['./webdata-management.component.css'],
  providers: [WebdataService]
})
export class WebdataManagementComponent implements OnInit {

  constructor(public webdataService: WebdataService) { }

  ngOnInit(): void {

    this.getWebdata();

  }

  getWebdata(){

    this.webdataService.getWebdata().subscribe( res => {

      this.webdataService.selectedWebdata = res[0];

    }, err => {

    });

  }

  onSaveWebdata(form){

    let formMessage = this.webdataFormValidation();

    if(formMessage == "OK"){

      let id = (<HTMLInputElement> document.getElementById("idWebdata")).value;

      if(id == ""){

        this.webdataService.addWebdata(form.value).subscribe( res => {
          M.toast({html: "Datos guardados correctamente"});
          location.reload();
        }, err => {
          console.log(err);
          M.toast({html: "Error al guardar datos"});
        });

      }else{
        console.log(form.value);

        this.webdataService.updateWebdata(form.value).subscribe( res => {
          M.toast({html: "Datos actualizados correctamente"});
          location.reload();
        }, err => {
          console.log("Error Webdata: " +err);
          M.toast({html: "Error al actualizar datos"});
        });

      }

    }else{

      M.toast({html: formMessage});

    }

  }

  webdataFormValidation(): string {
    let title = (<HTMLInputElement> document.getElementById("title")).value.trim();
    let metaTitle = (<HTMLInputElement> document.getElementById("metaTitle")).value.trim();
    let metaDescription = (<HTMLInputElement> document.getElementById("metaDescription")).value.trim();

    if(title.length <= 1){
      return "Título incorrecto";
    }else if(metaTitle.length <= 1){
      return "Meta-Título incorrecto";
    }else if(metaDescription.length <= 1){
      return "Meta-Descripción incorrecta";
    }

    return "OK";
  }

}
