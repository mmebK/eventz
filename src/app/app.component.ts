import {Component, OnInit} from '@angular/core';
import {ItEvent} from './shared/events';
import {EventsService} from './services/events.service';
import {IntlService} from '@progress/kendo-angular-intl';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from './services/authentication.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {DataService} from './services/data.service';


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

    constructor(private eventsService: EventsService, private intl: IntlService,
                private fb: FormBuilder, private auth: AuthenticationService, private router: Router, private data: DataService) {
    }

    public ngOnInit() {

        this.auth.loadToken();

        console.log('updated jwt' + this.auth.jwt);
        if (this.auth.jwt == null) {
            return;
        } else {
            this.auth.isAuthenticated();
        }

        //this.auth.jwt = localStorage.getItem('token');

        /*this.router.events
            .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
            .subscribe(event => {
                if (
                    event.id === 1 &&
                    event.url === event.urlAfterRedirects
                ) {
                    let currentJwt = localStorage.getItem('token');

                    this.data.updateJwt(currentJwt);

                    // here your code when page is refresh
                }
            });*/
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
