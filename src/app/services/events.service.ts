import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ItEvent} from '../shared/events';
import {map} from 'rxjs/operators';

interface GetResponseEvents {
    _embedded: {
        events: ItEvent[]
    }
}


@Injectable({
    providedIn: 'root'
})
export class EventsService {

    url = 'http://localhost:8080/events';

    constructor(private http: HttpClient) {
    }


    getEvents(): Observable<ItEvent[]> {

        return this.http.get<GetResponseEvents>(this.url).pipe(map(data => data._embedded.events));
    }


    postEvent(event): Observable<any> {
        return this.http.post<Event>(this.url, event);
    }

    getEvent(eventId: number): Observable<ItEvent> {

        const eventUrl = `${this.url}/${eventId}`;
        return this.http.get<ItEvent>(eventUrl);

    }


}
