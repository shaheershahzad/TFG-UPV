import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {
    private isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    //Make UserName store Observable
    public currentLoggedUser = this.isUserLoggedIn.asObservable();

    // Setter to update UserName
    changeLoggedUser(user: boolean) {
        this.isUserLoggedIn.next(user);
    }
}