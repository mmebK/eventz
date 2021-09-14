import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private data = new Subject<any>();
    private data2 = new Subject<any>();
    currentData = this.data.asObservable();
    currentData2 = this.data.asObservable();
    jwt: BehaviorSubject<string> = new BehaviorSubject('');
    currentJwt = this.jwt.asObservable();


    constructor() {
    }


    updateData(item: any) {
        this.data.next(item);
    }

    updateAuth(item: any) {
        this.data2.next(item);
    }

    updateJwt(item: any) {
        this.jwt.next(item);
    }

}
