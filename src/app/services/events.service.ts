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
    urls = 'http://localhost:8080/saveImage';
    @Output() search: EventEmitter<any> = new EventEmitter();

    constructor(private http: HttpClient) {
    }


    getEventsByLocation(location): Observable<ItEvent[]> {
        const searchUrl = `${this.url}/search/findByLocation_CountryContainingOrLocation_CityContaining?country=${location}` + `&city=${location}`;
        return this.http.get<GetResponseEvents>(searchUrl).pipe(map(data => data._embedded.events));
    }


    getEventsByLocation_City(city: string): Observable<ItEvent[]> {
        const searchUrl = `${this.url}/search/findByLocation_CityContaining?city=${city}`;
        return this.http.get<GetResponseEvents>(searchUrl).pipe(map(data => data._embedded.events));
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

    getImage(eventId: number): Observable<any> {

        let searchImgUrl = 'http://localhost:8080/photoProduct';
        const eventUrl = `${searchImgUrl}/${eventId}`;
        return this.http.get<any>(eventUrl);

    }

    searchEventsByName(keyword: string): Observable<ItEvent[]> {
        const searchUrl = `${this.url}/search/findByNameContaining?name=${keyword}`;
        return this.http.get<GetResponseEvents>(searchUrl).pipe(map(data => data._embedded.events));
    }

    getEventListByCategory(category: string): Observable<ItEvent[]> {
        const searchUrl = `${this.url}/search/findByCategoryContaining?category=${category}`;
        return this.http.get<GetResponseEvents>(searchUrl).pipe(map(data => data._embedded.events));
    }

    searchEventsByNameLocationCategory(keyword: string, location: string, category: string): Observable<ItEvent[]> {
        const searchUrl = `${this.url}/search/findByNameContainingAndLocation_CityContainingAndCategoryContaining?name=${keyword}` + `&location=${location}` + `&category=${category}`;
        return this.http.get<GetResponseEvents>(searchUrl).pipe(map(data => data._embedded.events));
    }

    searchByLocation(location: string): Observable<ItEvent[]> {
        const searchUrl = `${this.url}/search/findByLocation_CityContaining?location=${location}`;
        return this.http.get<GetResponseEvents>(searchUrl).pipe(map(data => data._embedded.events));
    }


    postEventine(formData: FormData) {
        console.log('saving image called');
        return this.http.post(this.urls, formData);
    }
}
