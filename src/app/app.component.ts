import {Component, OnInit} from '@angular/core';
import {ItEvent} from './shared/events';
import {EventsService} from './services/events.service';
import {IntlService} from '@progress/kendo-angular-intl';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'eventzFE';
    events: ItEvent[];

    // Stringify model for presentational purposes
    // A simple method for the string-to-date conversion
    form: any;

    constructor(private eventsService: EventsService, private intl: IntlService, private fb: FormBuilder) {
    }

    public ngOnInit() {
        this.form = new FormGroup({
            departureTime: new FormControl()
        });
    }

    /*public handleChange(value: Date) {
        // Update the JSON departureTime string date
        //this.model.departureTime = this.intl.formatDate(value, 'HH:mm:ss');

        this.output = JSON.stringify(this.model);

    }*/

    submit() {
        console.log(this.form.value);

    }


}
