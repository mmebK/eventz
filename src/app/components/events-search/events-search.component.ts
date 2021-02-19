import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CategoriesService} from '../../services/categories.service';
import {ItEvent} from '../../shared/events';
import {EventsService} from '../../services/events.service';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';

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

    constructor(private dataService: DataService, private categoriesService: CategoriesService, private fb: FormBuilder, private eventService: EventsService, private route: Router) {
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

    doSearch(value, value2, value3) {
        //  console.log(`${value}`);
        //  console.log(this.search.value);


        //this.eventService.search.subscribe(data => console.log(data));
        console.log('inside dosearch ' + value);

        this.eventService.searchEventsByNameLocationCategory(value, value2, value3).subscribe(data => {
            this.events = data;
            console.log(data);
        });

    }

    doSearchKeyWord(value2) {
        console.log(`${value2}`);

        this.eventService.searchEventsByName(value2).subscribe(data => this.events = data);

    }
}
