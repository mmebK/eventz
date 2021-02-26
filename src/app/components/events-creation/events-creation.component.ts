import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CategoriesService} from '../../services/categories.service';
import {EventsService} from '../../services/events.service';
import {AuthenticationService} from '../../services/authentication.service';
import {ImageUploadComponent} from '../image-upload/image-upload.component';
import {MatDialog} from '@angular/material/dialog';
import {DataService} from '../../services/data.service';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {FormValidators} from '../../validators/form-validators';


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
    onlineUrlMessage;
    active;
    disabled = true;
    myTime: Date;
    image: any = File;
    @ViewChild(MatAccordion) accordion: MatAccordion;
    @ViewChild(MatExpansionPanel) panel: MatExpansionPanel;
    isLinear = false;
    generalInfo: FormGroup;
    sessionForm: FormGroup;
    public value;
    complementInfo: FormGroup;
    step = 0;
    categories;
    public today: Date = new Date();
    imageChangedEvent: any = '';
    croppedImage: any = '';
    image2;
    files: any = [];
    filename: any;

    private validationMessages = {
        required: 'please enter the online url ',
        onlineUrl: 'please enter a valid online url'
    };

    constructor(private http: HttpClient, private sanitizer: DomSanitizer, private dataService: DataService, private fb: FormBuilder, private router: Router, private catService: CategoriesService, private eventService: EventsService, private auth: AuthenticationService, public dialog: MatDialog) {
    }

    get sessions() {
        return <FormArray> this.sessionForm.get('sessions');
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
        let imageVal;
        imageVal = this.image2;

    }

    openDialog() {
        this.dialog.open(ImageUploadComponent, {
            data: {
                animal: 'panda'
            }
        });
    }


    ngOnInit(): void {
        //this.reactiveForm();
        this.categories = this.catService.getCategories();


        this.generalInfo = this.fb.group({
            basicInfo: this.fb.group({
                name: ['', Validators.required],
                organizer: ['', Validators.required],
                category: ['', Validators.required],
                onlineUrl: ['', [Validators.required, FormValidators.onlineUrl]]
            }),
            addressInfo: this.fb.group({
                address: ['', Validators.required],
                address2: [''],
                city: ['', Validators.required],
                region: ['', Validators.required],
                zipCode: ['', Validators.required],
                country: ['', Validators.required]
            }),
            dateInfo: this.fb.group({
                startOfEvent: ['', Validators.required],
                startTime: ['', Validators.required],
                endOfEvent: ['', Validators.required],
                endTime: ['', Validators.required]
            })
        });
        this.complementInfo = this.fb.group({
            // imageUrl: '',
            description: ['', Validators.required],
        });
        this.sessionForm = this.fb.group({
            sessions: this.fb.array([this.buildSession()])

        });
        /*const onlineUrlControl = this.generalInfo.get('baseInfo.onlineUrl');
        onlineUrlControl.valueChanges.pipe(
            debounceTime(1000)).subscribe(() => this.setMessage(onlineUrlControl));*/


    }


    printJson(jsonObj, jsonObj2, jsonObj3) {

        let jsonCopy = JSON.parse(JSON.stringify(jsonObj, replacer));
        let jsonCopy2 = JSON.parse(JSON.stringify(jsonObj2));
        let jsonCopy3 = JSON.parse(JSON.stringify(jsonObj3));
        let a = {};
        let i = 0;

        Object.keys(jsonCopy3).forEach(key => {

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
            name: ['', Validators.required],
            presenter: ['', Validators.required],
            level: ['', Validators.required],
            description: ['', Validators.required],

        });
    }

    private setMessage(control: AbstractControl): void {
        this.onlineUrlMessage = '';
        if ((control.touched || control.dirty) && control.errors) {
            this.onlineUrlMessage = Object.keys(control.errors).map(
                key => this.validationMessages[key].join(' ')
            );
        }


    }
}


