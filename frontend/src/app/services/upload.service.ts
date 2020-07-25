import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  uploadURI: string = "http://localhost:3000/api/files/upload";
  //uploadURI: string = "/api/files/upload";

  constructor(private httpClient: HttpClient) { }

  uploadFile(formData) {
    return this.httpClient.post(this.uploadURI, formData);
  }
}
