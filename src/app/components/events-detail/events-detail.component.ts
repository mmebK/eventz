import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {EventsService} from '../../services/events.service';
import {ItEvent} from '../../shared/events';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../../services/data.service';


function compressImage(src, newX, newY) {
    return new Promise((res, rej) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            const elem = document.createElement('canvas');
            elem.width = newX;
            elem.height = newY;
            const ctx = elem.getContext('2d');
            ctx.drawImage(img, 0, 0, newX, newY);
            const data = ctx.canvas.toDataURL();
            res(data);
        };
        img.onerror = error => rej(error);
    });
}

@Component({
    selector: 'app-events-detail',
    templateUrl: './events-detail.component.html',
    styleUrls: ['./events-detail.component.css']
})
export class EventsDetailComponent implements OnInit {

    panelOpenState = false;
    event: ItEvent;
    image: any;

    constructor(private data: DataService, private http: HttpClient, private fb: FormBuilder, private eventService: EventsService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {

    }

    ngOnInit() {
        this.route.paramMap.subscribe(() => this.handleEventDetails());
        // this.image = 'http://localhost:8080/photoProduct/' + 1;

    }

    public uploadSuccess(event): void {
        console.log(event);
    }

    private handleEventDetails() {

        let eventId: number = +this.route.snapshot.paramMap.get('id');
        this.eventService.getEventById(eventId).subscribe(data => {
            console.log(data);
            this.event = data;
        });
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8080/photoProduct/' + eventId);
        //let sometime = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8080/photoProduct/' + eventId);
        /*compressImage(sometime, 100, 100).then(compressed => {
            this.image = compressed;
        });*/
        // this.image = 'data:image/png;base64,' +
    }
}
