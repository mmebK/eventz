import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventsService} from '../../services/events.service';
import {EventsSearchComponent} from '../events-search/events-search.component';
import {DataService} from '../../services/data.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    authenticated: boolean = false;
    userName: string;

    constructor(private dataService: DataService, private route: Router, private eventService: EventsService, private auth: AuthenticationService) {
    }

    ngOnInit(): void {
        this.auth.isAuth.subscribe(data => this.authenticated = data);
        // this.auth.jwtUpdated.subscribe(data => this.authenticated = (data != null));
        // this.authenticated = this.auth.isAuthenticated();
        console.log('from navbar is auth:' + this.authenticated);
        this.auth.userNameUpdated.subscribe(data => this.userName = data);
        //this.userName = localStorage.getItem('userName');

    }

    doSearch(value: string) {
        // console.log(`${value}`);
        this.route.navigateByUrl(`/search`);
        this.dataService.updateData(value);
        console.log(value);
        //  this.eventService.search.emit(value);
    }

    logout() {
        this.auth.logOut();
        // this.route.navigate(['/events']);
        window.location.reload();

    }
}
