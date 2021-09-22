import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CategoriesService} from '../../services/categories.service';
import {EventsService} from '../../services/events.service';
import {AuthenticationService} from '../../services/authentication.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ImageUploadComponent} from '../image-upload/image-upload.component';
import {MatDialog} from '@angular/material/dialog';
import {DataService} from '../../services/data.service';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';


let replacerd = function(key, value) {
    return typeof value === 'string' && this[key] instanceof Date ? String(this[key]) : value;
};

let replacer = function(key, value) {

    if (typeof value === 'string' && this[key] instanceof Date) {
        return this[key].toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'});
    }

    return value;
};




@Component({
    selector: 'app-events-creation',
    templateUrl: './events-creation.component.html',
    styleUrls: ['./events-creation.component.scss']
})
export class EventsCreationComponent implements OnInit {

    active;
    disabled = true;
    myTime: Date;
    eventForm: FormGroup;
    image: any = File;
    @ViewChild(MatAccordion) accordion: MatAccordion;
    @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;

    isLinear = false;
    generalInfo: FormGroup;
    addressInfo: FormGroup;
    sessionForm: FormGroup;
    selected: false;
    public value;
    public value2;
    complementInfo: FormGroup;
    step = 0;
    categories;
    public today: Date = new Date();
    imageChangedEvent: any = '';
    croppedImage: any = '';
    image2;
    files: any = [];
    filename: any;

    constructor(private http: HttpClient, private sanitizer: DomSanitizer, private dataService: DataService, private fb: FormBuilder, private router: Router, private catService: CategoriesService, private eventService: EventsService, private auth: AuthenticationService, public dialog: MatDialog) {
    }

    get sessions() {
        return <FormArray> this.sessionForm.get('sessions');
    }

    uploadFile(event) {
        for (let index = 0; index < event.length; index++) {
            const element = event[index];
            this.files.push(element.name);
        }
    }


    fileChangeEvent(event: any): void {
        console.log('from 1st component' + event.value);
        this.imageChangedEvent = event;
        this.filename = event.name;

        this.openDialog();

        this.dataService.updateImage((this.imageChangedEvent));
        this.dataService.croppedImage.subscribe(data => this.image2 = data);

        this.dataService.fileToUpload.subscribe(data => this.image = data);

        console.log('image data is' + this.image);

        console.log(this.image2);


    }

    public uploadSuccess(event): void {
        console.log(event);
    }

    openDialog() {
        this.dialog.open(ImageUploadComponent, {
            data: {
                animal: 'panda'
            }
        });
    }

    imageLoaded() {
        // show cropper
    }

    cropperReady() {
        // cropper ready
    }

    loadImageFailed() {
        // show message
    }

    ngOnInit(): void {
        //this.reactiveForm();
        this.categories = this.catService.getCategories();


        this.generalInfo = this.fb.group({
            basicInfo: this.fb.group({
                name: ['', Validators.required],
                organizer: ['', Validators.required],
                category: ['', Validators.required],
                onlineUrl: ['', Validators.required]
            }),
            addressInfo: this.fb.group({
                address: ['', Validators.required],
                address2: ['', Validators.required],
                city: ['', Validators.required],
                region: ['', Validators.required],
                zipCode: ['', Validators.required],
                country: ['', Validators.required]
            }),
            dateInfo: this.fb.group({
                startOfEvent: '',
                startTime: '',
                endOfEvent: '',
                endTime: ''
            })
        });
        this.complementInfo = this.fb.group({
            // imageUrl: '',
            description: '',
        });
        this.sessionForm = this.fb.group({
            sessions: this.fb.array([this.buildSession()])

        });

    }


    printJson(jsonObj, jsonObj2, jsonObj3) {

        let jsonCopy = JSON.parse(JSON.stringify(jsonObj, replacer));
        let jsonCopy2 = JSON.parse(JSON.stringify(jsonObj2));
        let jsonCopy3 = JSON.parse(JSON.stringify(jsonObj3));
        let a = {};
        let i = 0;


        //  console.log(i++);
        //  console.log(prop);
        // console.log(jsonCopy3[prop]);
        //console.log(jsonCopy3);
        Object.keys(jsonCopy3).forEach(key => {
            // console.log('this is the key:' + key);
            //  console.log('this is the value:' + jsonCopy3[key]);
        });

        Object.keys(jsonCopy3).forEach(key => a[key] = jsonCopy3[key]);

        for (let prop in jsonCopy2) {

            Object.keys(prop).map(() => a['eventSessions'] = jsonCopy2[prop]);

        }

        for (let prop in jsonCopy) {
            if (prop == 'basicInfo' || prop == 'dateInfo') {

                Object.keys(jsonCopy[prop]).forEach(key => a[key] = jsonCopy[prop][key]);
                /* Object.keys(jsonCopy)
                     .filter(key => (key == 'basicInfo') || (key == 'dateInfo'))
                     .forEach(key => console.log(jsonCopy[key]));*/
            } else {
                Object.keys(jsonCopy).filter(key => (key != 'basicInfo') && (key != 'dateInfo')).forEach(key => a['location'] = jsonCopy[key]);
            }

        }
        return a;

    }



    submitForm() {


        let event = this.printJson(this.generalInfo.value, this.sessionForm.value, this.complementInfo.value);


        let formData = new FormData();
        console.log(this.image);
        formData.append('event', JSON.stringify(event));
        formData.append('file', this.image);
        this.eventService.postEvent(formData).subscribe(response => console.log(response));

    }


    togglePanel(mep) {
        mep.expanded = !mep.expanded;
    }


    removeImage() {
        this.image2 = undefined;
    }

    resizeImage() {
        this.openDialog();
    }


    addSession() {
        this.sessions.push(this.buildSession());
    }

    removeSession(index) {
        this.sessions.removeAt(index);
    }

    private buildSession() {
        return this.fb.group({
            name: '',
            presenter: '',
            level: '',
            description: '',

        });
    }
}


