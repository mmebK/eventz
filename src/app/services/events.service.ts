import {EventEmitter, Injectable, Output} from '@angular/core';
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
    @Output() search: EventEmitter<any> = new EventEmitter();
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

    searchEvents(keyword: string): Observable<ItEvent[]> {
        const searchUrl = `${this.url}/search/findByNameContaining?name=${keyword}`;
        return this.http.get<GetResponseEvents>(searchUrl).pipe(map(data => data._embedded.events));
    }

    searchEventses(keyword: string, location: string, category: string): Observable<ItEvent[]> {
        const searchUrl = `${this.url}/search/findByNameContainingAndLocation_CityContainingAndCategoryContaining?name=${keyword}` + `&location=${location}` + `&category=${category}`;
        return this.http.get<GetResponseEvents>(searchUrl).pipe(map(data => data._embedded.events));
    }

    searchByLocation(location: string): Observable<ItEvent[]> {
        const searchUrl = `${this.url}/search/findByLocation_CityContaining?location=${location}`;
        return this.http.get<GetResponseEvents>(searchUrl).pipe(map(data => data._embedded.events));
    }


}
