import {Component, OnInit} from '@angular/core';
import {ItEvent} from './shared/events';
import {EventsService} from './services/events.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'eventzFE';
    events: ItEvent[];

    constructor(private eventsService: EventsService) {
    }

    ngOnInit(): void {


    }


}
