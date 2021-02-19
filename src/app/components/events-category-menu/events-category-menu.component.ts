import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {CategoriesService} from '../../services/categories.service';
import {EventsService} from '../../services/events.service';

@Component({
    selector: 'app-events-category-menu',
    templateUrl: './events-category-menu.component.html',
    styleUrls: ['./events-category-menu.component.css']
})
export class EventsCategoryMenuComponent implements OnInit {

    navKeyWords;
    key = '';

    constructor(private data: DataService, private keyWords: CategoriesService) {
    }

    ngOnInit(): void {
        this.navKeyWords = this.keyWords.getCategories();
    }

    doSearch(value) {
        this.data.updateLocationSearch(value);
    }

    searchCategory(keyword) {
        this.data.updateCategorySearch(keyword);
        //console.log(keyword);

    }
}
