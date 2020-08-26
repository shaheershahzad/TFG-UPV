import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Webdata } from '../models/webdata';

@Injectable({
  providedIn: 'root'
})
export class WebdataService {

  readonly webdataAPI = "http://localhost:3000/api/webdata";
  //readonly webdataAPI = "/api/webdata";
  selectedWebdata: Webdata;

  constructor(private httpClient: HttpClient) {
    this.selectedWebdata = new Webdata();
  }

  getWebdata(){
    return this.httpClient.get(this.webdataAPI);
  }

  addWebdata(webdata: Webdata){
    return this.httpClient.post(this.webdataAPI, webdata);
  }

  updateWebdata(webdata: Webdata){
    return this.httpClient.put(this.webdataAPI + `/${webdata._id}`, webdata);
  }

}
