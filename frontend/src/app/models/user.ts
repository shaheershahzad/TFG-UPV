import { enableDebugTools } from '@angular/platform-browser';

export class User {

    constructor(_id:string, name:string, email:string, password:string, role:string, birthday:string, newsletter:boolean){
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.birthday = birthday;
        this.newsletter = newsletter;
    }

    _id: String;
    name: String;
    email: String;
    password: String;
    role: String;
    birthday: String;
    newsletter: Boolean;
}