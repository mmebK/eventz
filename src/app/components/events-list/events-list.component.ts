import {Component, OnInit} from '@angular/core';
import {ItEvent} from '../../shared/events';
import {EventsService} from '../../services/events.service';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {


    events: ItEvent[];

    constructor(private eventsService: EventsService) {
    }

    ngOnInit(): void {
        this.eventsList();


    }

    private eventsList() {
        this.eventsService.getEvents().subscribe(data => {
            this.events = data;
            console.log(data);
        });
    }
}
