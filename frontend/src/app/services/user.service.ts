import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly userAPI = "http://localhost:3000/api/users2";
  //readonly userAPI = "/api/users2";
  selectedUser: User;
  users: User[];

  constructor(private httpClient: HttpClient) {
    this.selectedUser = new User();
  }

  getUsers(){
    return this.httpClient.get(this.userAPI);
  }

  getUser(_id: string){
    return this.httpClient.get(this.userAPI + `/user-details/${_id}`);
  }

  addUser(user: User){
    return this.httpClient.post(this.userAPI, user);
  }

  updateUser(user: User){
    return this.httpClient.put(this.userAPI + `/${user._id}`, user);
  }

  resetPassword(email: string, password: string){
    let params = new HttpParams().set("recoveryEmail", email).set("newPassword", password);
    return this.httpClient.put(this.userAPI + `/reset-password`, {}, {params: params});
  }

  deleteUser(_id: String){
    return this.httpClient.delete(this.userAPI + `/${_id}`);
  }
}
