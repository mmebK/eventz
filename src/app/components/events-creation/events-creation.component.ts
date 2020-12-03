import {Component, OnInit} from '@angular/core';
import {NgbNavChangeEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-events-creation',
    templateUrl: './events-creation.component.html',
    styleUrls: ['./events-creation.component.css']
})
export class EventsCreationComponent implements OnInit {
    active;
    disabled = true;

    constructor() {
    }

    ngOnInit(): void {
    }


    onNavChange(changeEvent: NgbNavChangeEvent) {
        if (changeEvent.nextId === 3) {
            changeEvent.preventDefault();
        }
    }

    toggleDisabled() {
        this.disabled = !this.disabled;
        if (this.disabled) {
        }
    }

}
