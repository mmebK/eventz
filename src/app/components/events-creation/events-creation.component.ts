import {Component, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {$} from 'protractor';
import {EventCategories} from '../../shared/categories';
import {CategoriesService} from '../../services/categories.service';
import {EventsService} from '../../services/events.service';
import {PopupSettings} from '@progress/kendo-angular-dateinputs';
import {IgxTimePickerComponent} from 'igniteui-angular';
import {EventEmitter} from 'events';
import {log} from 'util';

/*Date.prototype.toJSON = function() {
    return this.toString();
};*/
let replacerd = function(key, value) {
    return typeof value === 'string' && this[key] instanceof Date ? String(this[key]) : value;
};

let replacer = function(key, value) {

    if (typeof value === 'string' && this[key] instanceof Date) {
        return this[key].toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'});
    }

    return value;
};


/*Date.prototype.toJSON = function() {
    let timezoneOffsetInHours = -(this.getTimezoneOffset() / 60); //UTC minus local time
    let sign = timezoneOffsetInHours >= 0 ? '+' : '-';
    let leadingZero = (Math.abs(timezoneOffsetInHours) < 10) ? '0' : '';

    //It's a bit unfortunate that we need to construct a new Date instance
    //(we don't want _this_ Date instance to be modified)
    let correctedDate = new Date(this.getFullYear(), this.getMonth(),
        this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(),
        this.getMilliseconds());
    correctedDate.setHours(this.getHours() + timezoneOffsetInHours);
    let iso = correctedDate.toISOString().replace('Z', '');

    return iso + sign + leadingZero + Math.abs(timezoneOffsetInHours).toString() + ':00';
};*/

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
    isOpen: boolean = false;
    categories;
    formJoin: FormGroup;
    // combining forms
    data: 25;
    mytime: any;
    public today: Date = new Date();
    private myDate: Date;

    constructor(private fb: FormBuilder, private router: Router, private catService: CategoriesService, private eventService: EventsService) {
    }

    get timeol() {
        return this.sessionForm.get('sessions.0').get('timeL').value;
    }

    get sessions() {
        return <FormArray> this.sessionForm.get('sessions');
    }

    public onBlur(inputValue: string, value: Date, picker: IgxTimePickerComponent) {
        const parts = inputValue.split(/[\s:]+/);

        const hour = parseInt(parts[0], 10);
        const minutes = parseInt(parts[1], 10);

        if (picker.validHourEntries.indexOf(hour) !== -1 && picker.validMinuteEntries.indexOf(minutes) !== -1) {
            value.setHours(hour, minutes);
        } else {
            throw new Error('This is not a valid hour.');
        }
    }

    public selectNow(timePicker: IgxTimePickerComponent) {
        timePicker.value = this.today;
        timePicker.close();
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
            imageUrl: '',
            description: '',
        });
        this.sessionForm = this.fb.group({
            sessions: this.fb.array([this.buildSession()])

        });

        this.formJoin = new FormGroup({
            form1: this.generalInfo,
            form2: this.sessionForm
        });
    }

    addSession() {
        this.sessions.push(this.buildSession());
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
        console.log(jsonCopy3);
        Object.keys(jsonCopy3).forEach(key => {
            console.log('this is the key:' + key);
            console.log('this is the value:' + jsonCopy3[key]);
        });

        Object.keys(jsonCopy3).forEach(key => a[key] = jsonCopy3[key]);

        for (let prop in jsonCopy2) {

            Object.keys(prop).map(() => a['eventSessions'] = jsonCopy2[prop]);

        }

        //damn shit that was shitty fuc*ing not easy to do
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
        //console.log(this.myDate);
        // console.log(a);
        return a;

    }

    save() {
        //console.log(this.sessionForm.value);

        //console.log(this.generalInfo.get('basicInfo').value);
        //console.log(this.generalInfo.get('dateInfo').get('startOfEvent').value.patchValue(5));

        // console.log(this.myDate);

        // console.log(this.generalInfo.value.concat(this.sessionForm.value));
        // this.printJson(this.generalInfo.value.concat(this.sessionForm.value));
        // this.router.navigate(['/events']);


    }

    submitForm() {
        let b = {a: 'dede'};
        let c = JSON.stringify(b);
        // console.log(c);
        //console.log(this.sessionForm.value);

        /*this.generalInfo.patchValue({
            dateInfo: {

            }
        });*/
        //console.log(this.generalInfo.get('dateInfo').get('startOfEvent').value);
        //this.printJson(this.generalInfo.value, this.sessionForm.value);

        //console.log(this.printJson(this.generalInfo.value));

        let event = this.printJson(this.generalInfo.value, this.sessionForm.value, this.complementInfo.value);
        console.log(event);
        this.eventService.postEvent(event).subscribe();
        //console.log(this.today);
        /*console.log(this.sessionForm.get('sessions').get('0.timeL').value);
        this.sessionForm.get('sessions.0').get('timeL').valueChanges.subscribe((change) => {
            console.log(change);
        });*/
    }

    togglePanel(mep) {
        mep.expanded = !mep.expanded;
    }


    updateDOB(event) {
        /*let field = JSON.stringify(event.value);
        let f = field.substring(1, 15);
        console.log(f);*/
        //console.log(event.value.toLocaleString().substring(1, 10));
        //   console.log(event.value.toLocaleString().substring(1));

        /*this.myDate = new Date(
            event.value.getFullYear(),
            event.value.getMonth(),
            event.value.getDate()
        );*/
        //  console.log(this.value.toLocaleString());

    }

    focusInputField() {

    }

    private buildSession() {
        return this.fb.group({
            name: '',
            presenter: '',
            duration: '',
            level: '',
            description: '',
            timeL: '',
            timestamp: ''
        });
    }
}


