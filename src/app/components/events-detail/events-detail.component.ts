import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion';
import * as moment from 'moment';
import {log} from 'util';
import {EventsService} from '../../services/events.service';
import {ItEvent} from '../../shared/events';


@Component({
    selector: 'app-events-detail',
    templateUrl: './events-detail.component.html',
    styleUrls: ['./events-detail.component.css']
})
export class EventsDetailComponent implements OnInit {

    panelOpenState = false;
    event: ItEvent;

    constructor(private fb: FormBuilder, private eventService: EventsService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.paramMap.subscribe(() => this.handleEventDetails());


    }


    private handleEventDetails() {

        let eventId: number = +this.route.snapshot.paramMap.get('id');
        this.eventService.getEvent(eventId).subscribe(data => {
            console.log(data);
            this.event = data;
        });
    }
}
