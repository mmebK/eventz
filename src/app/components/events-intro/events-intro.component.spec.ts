import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EventsIntroComponent} from './events-intro.component';

describe('EventsIntroComponent', () => {
    let component: EventsIntroComponent;
    let fixture: ComponentFixture<EventsIntroComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EventsIntroComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsIntroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
