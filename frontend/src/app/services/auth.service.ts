import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../interfaces/user';
import { JwtResponseI } from '../interfaces/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate {
  AUTH_SERVER: string = "http://localhost:3000";
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient, private router: Router) { }

  register(user:UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`, user)
    .pipe(
      tap(
        (res: JwtResponseI) => {
          if(res){
            //guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.dataUser.role);
          }
        }
      )
    );
  }

  login(user:UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`, user)
    .pipe(
      tap(
        (res: JwtResponseI) => {
          if(res){
            //guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn, res.dataUser.role);
          }
        }
      )
    );
  }

  logout(): void{
    this.token = "";
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("ROLE");
  }

  private saveToken(token: string, expiresIn: string, role: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    localStorage.setItem("ROLE", role);
    this.token = token;
  }

  private getToken(): string{
    if(this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

  loggedIn(): boolean{
    if(localStorage.getItem("ACCESS_TOKEN") != null){
      return true;
    }else{
      return false;
    }
  }

  canActivate(): boolean {
    if (!this.loggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  isSuperadmin(): boolean {
    if(localStorage.getItem("ROLE") != null && localStorage.getItem("ROLE") == "superadmin"){
      return true;
    }else{
      return false;
    }
  }

  isAdmin(): boolean {
    if(localStorage.getItem("ROLE") != null && localStorage.getItem("ROLE") == "admin"){
      return true;
    }else{
      return false;
    }
  }

  isRegistered(): boolean {
    if(localStorage.getItem("ROLE") != null && localStorage.getItem("ROLE") == "registered"){
      return true;
    }else{
      return false;
    }
  }

  isDoner(): boolean {
    if(localStorage.getItem("ROLE") != null && localStorage.getItem("ROLE") == "doner"){
      return true;
    }else{
      return false;
    }
  }

}
