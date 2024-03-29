import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EventsListComponent} from './components/events-list/events-list.component';
import {EventsDetailComponent} from './components/events-detail/events-detail.component';
import {EventsSearchComponent} from './components/events-search/events-search.component';
import {EventsCreationComponent} from './components/events-creation/events-creation.component';
import {EventsCategoryMenuComponent} from './components/events-category-menu/events-category-menu.component';
import {SingupComponent} from './components/user/singup/singup.component';
import {LoginComponent} from './components/user/login/login.component';
import {EventsService} from './services/events.service';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventsIntroComponent} from './components/events-intro/events-intro.component';
import {RouterModule} from '@angular/router';
import {MainPageComponent} from './components/main-page/main-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {AngularMaterialModule} from './material.module';
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';
import {MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter';
//import {MomentUtcDateAdapter} from './shared/jpl';
import {IntlModule} from '@progress/kendo-angular-intl';
import {EventsModule} from '@progress/kendo-angular-common';
import {DurationInputComponent} from './components/duration-input/duration-input.component';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {MatCardModule} from '@angular/material/card';
import {IgxButtonModule, IgxIconModule, IgxInputGroupModule, IgxTimePickerModule} from 'igniteui-angular';
import {ImageUploadComponent} from './components/image-upload/image-upload.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatTabsModule} from '@angular/material/tabs';
import {DataService} from './services/data.service';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ImageCropperComponent} from './components/image-cropper/image-cropper.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {MatDialogModule} from '@angular/material/dialog';
import {DragDropImageDirective} from './directives/drag-drop-image.directive';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {FilePickerModule} from 'ngx-awesome-uploader';


@NgModule({
    declarations: [
        AppComponent,
        EventsListComponent,
        EventsDetailComponent,
        EventsSearchComponent,
        EventsCreationComponent,
        EventsCategoryMenuComponent,
        LoginComponent,
        SingupComponent,
        NavbarComponent,
        EventsIntroComponent,
        MainPageComponent,
        DurationInputComponent,
        ImageUploadComponent,
        ImageCropperComponent,
        DragDropImageDirective,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([

            // {path: 'newEvent', component: EventsCreationComponent, canActivate: [AuthGuardGuard]},
            {path: 'newEvent', component: EventsCreationComponent},
            {path: 'login', component: LoginComponent},
            {path: 'search', component: EventsSearchComponent},
            {path: 'search/:keyword', component: EventsSearchComponent},
            {path: 'events/:id', component: EventsDetailComponent},
            {path: 'events', component: MainPageComponent},
            {path: 'details', component: EventsDetailComponent},
            {path: '', redirectTo: '/events', pathMatch: 'full'},
            {path: '**', redirectTo: '/events', pathMatch: 'full'},
            {path: '**', redirectTo: '/events/api', pathMatch: 'full'},

        ]),
        BrowserAnimationsModule,
        MatSliderModule,
        NgxMaterialTimepickerModule,
        TimepickerModule.forRoot(),
        AngularMaterialModule,
        IntlModule,
        DateInputsModule,
        EventsModule,
        NgxMatDatetimePickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatTimepickerModule,
        MatDatepickerModule,
        TimepickerModule,
        PopoverModule.forRoot(),
        MatCardModule,
        IgxTimePickerModule,
        IgxInputGroupModule,
        IgxIconModule,
        IgxButtonModule,
        FontAwesomeModule,
        MatTabsModule,
        BsDropdownModule,
        ImageCropperModule,
        MatDialogModule,
        MaterialFileInputModule, FilePickerModule

    ],
    providers: [EventsService, EventsSearchComponent, DataService,
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule {
}
