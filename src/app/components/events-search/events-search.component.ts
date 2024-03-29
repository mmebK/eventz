import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CategoriesService} from '../../services/categories.service';
import {ItEvent} from '../../shared/events';
import {EventsService} from '../../services/events.service';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-events-search',
    templateUrl: './events-search.component.html',
    styleUrls: ['./events-search.component.css']
})
export class EventsSearchComponent implements OnInit {
    value: any;
    states: any;
    categories;
    search: FormGroup;
    events: ItEvent[];
    private eventId: number;
    image;

    constructor(private dataService: DataService, private categoriesService: CategoriesService, private fb: FormBuilder, private eventService: EventsService, private route: Router, private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        this.search = this.fb.group({
            searchInput: '',
            locationInput: '',
            category: '',
            date: ''
        });
        this.categories = this.categoriesService.getCategories();
        this.eventService.getEvents().subscribe(data => this.events = data);
        //  console.log(this.events);
        this.dataService.currentData.subscribe(data => {
            this.doSearchKeyWord(data);
            this.search.get('searchInput').setValue(data);
        });
    }

    setCurrentIndex(i: number) {
        this.eventId = i;
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8080/photoProduct/' + this.eventId);
        console.log(this.eventId);
    }

    doSearch(value, value2, value3) {
        //  console.log(`${value}`);
        //  console.log(this.search.value);


        //this.eventService.search.subscribe(data => console.log(data));
        console.log('inside dosearch ' + value);

        this.eventService.getEventsByNameLocationCategory(value, value2, value3).subscribe(data => {
            this.events = data;
            console.log(data);
        });

    }

    doSearchKeyWord(value2) {
        console.log(`${value2}`);

        this.eventService.getEventsByName(value2).subscribe(data => this.events = data);

    }
}
