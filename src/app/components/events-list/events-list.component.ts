import {Component, Input, OnInit} from '@angular/core';
import {ItEvent} from '../../shared/events';
import {EventsService} from '../../services/events.service';
import {DataService} from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {


    events: ItEvent[];
    locationSearchValue;
    categorySearchValue;
    image;
    eventId;
    imageUrl: 'http://localhost:8080/photosProduct/';


    constructor(private eventsService: EventsService, private data: DataService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.eventsList();
        this.data.locationSearch.subscribe(data => {
            this.locationSearchValue = data;
            console.log(this.locationSearchValue);
            this.eventListSearchByLocation();
        });
        this.data.categorySearch.subscribe(data => {
            this.categorySearchValue = data;
            this.eventListSearchByCategory();
        });


    }

    eventListSearchByLocation() {
        this.eventsService.getEventsByLocation(this.locationSearchValue).subscribe(data => {
            this.events = data;
            console.log(this.events);
        });

    }

    setCurrentIndex(i: number) {
        this.eventId = i;
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8080/photoProduct/' + this.eventId);
        console.log(this.eventId);
    }

    private eventsList() {
        this.eventsService.getEvents().subscribe(data => {
            this.events = data;
            //    this.image = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8080/photoProduct/' +);
            console.log(data);
        });
    }

    private eventListSearchByCategory() {
        this.eventsService.getEventsByCategory(this.categorySearchValue).subscribe(
            data => this.events = data);
    }
}
