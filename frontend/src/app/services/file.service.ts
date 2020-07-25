import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileModel } from '../models/file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  //readonly fileAPI = "http://localhost:3000/api/files";
  readonly fileAPI = "/api/files";
  selectedFile: FileModel;
  files: FileModel[];

  constructor(private httpClient: HttpClient) {
    this.selectedFile = new FileModel();
  }

  getFiles(){
    return this.httpClient.get(this.fileAPI);
  }

  getProjectFiles(_id: String){
    return this.httpClient.get(this.fileAPI + `/project/${_id}`);
  }

  addFile(file: FileModel){
    return this.httpClient.post(this.fileAPI, file);
  }

  addFiles(files: Array<FileModel>){
    return this.httpClient.post(this.fileAPI, files);
  }

  updateFile(file: FileModel){
    return this.httpClient.put(this.fileAPI + `/${file._id}`, file);
  }

  deleteFile(_id: String){
    return this.httpClient.delete(this.fileAPI + `/${_id}`);
  }
}
