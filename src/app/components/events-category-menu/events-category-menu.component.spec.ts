import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventsCategoryMenuComponent} from './events-category-menu.component';

describe('EventsCategoryMenuComponent', () => {
    let component: EventsCategoryMenuComponent;
    let fixture: ComponentFixture<EventsCategoryMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EventsCategoryMenuComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsCategoryMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
