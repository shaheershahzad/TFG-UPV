import { Component, OnInit } from '@angular/core';
import { FileModel } from '../../../models/file';
import { FileService } from '../../../services/file.service';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';

declare const M: any;

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.css']
})
export class FileManagementComponent implements OnInit {

  public filesAvailable: boolean = false;
  public projects = {};

  constructor(public fileService: FileService, public projectService: ProjectService) { }

  ngOnInit(): void {

    //Modals
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    });

    this.getFiles();

  }

  getFiles(){
    this.fileService.getFiles().subscribe( res => {
      this.fileService.files = res as FileModel[];

      if(this.fileService.files.length > 0){
        this.filesAvailable = true;
      }else{
        this.filesAvailable = false;
      }

      this.getProjects();
    });
  }

  getProjects(){
    this.projectService.getProjects().subscribe( res => {
      this.projectService.projects = res as Project[];

      // Hashmap to save project name with their IDs as keys
      this.projectService.projects.forEach(project => {
        this.projects[project._id.toString()] = project.name;
      });
    });
  }

  showDeleteFileConfirmation(id: string, name: string) {
    (<HTMLInputElement>document.querySelector('#fileID')).value = id;
    (<HTMLInputElement>document.querySelector('#fileNameDelete')).innerText = name;
    document.getElementById("deleteFileAction").click();
  }

  deleteFile(){

    let fileId = (<HTMLInputElement>document.querySelector('#fileID')).value;

    this.fileService.deleteFile(fileId).subscribe( res => {
      M.toast({html: "Fichero borrado"});
      this.getFiles();
    }, err => {
      console.log("Error al borrar el fichero.");
    });
    
  }

  downloadFile(){

  }

}
