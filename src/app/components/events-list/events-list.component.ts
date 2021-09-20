import {Component, OnInit} from '@angular/core';
import {ItEvent} from '../../shared/events';
import {EventsService} from '../../services/events.service';
import {DataService} from '../../services/data.service';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {


    events: ItEvent[];
    locationSearchValue;
    categorySearchValue;

    constructor(private eventsService: EventsService, private data: DataService) {
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

    private eventListSearchByLocation() {
        this.eventsService.getEventsByLocation(this.locationSearchValue).subscribe(data => {
            this.events = data;
            console.log(this.events);
        });

    }

    private eventsList() {
        this.eventsService.getEvents().subscribe(data => {
            this.events = data;
            console.log(data);
        });
    }

    private eventListSearchByCategory() {
        this.eventsService.getEventListByCategory(this.categorySearchValue).subscribe(
            data => this.events = data);
    }
}
