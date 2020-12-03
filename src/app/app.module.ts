import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

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
import {FormsModule} from '@angular/forms';
import {EventsIntroComponent} from './components/events-intro/events-intro.component';
import {RouterModule} from '@angular/router';
import {MainPageComponent} from './components/main-page/main-page.component';

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
    ],
    imports: [
        BrowserModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            {path: 'newEvent', component: EventsCreationComponent},
            {path: 'events', component: MainPageComponent},
            {path: '', redirectTo: '/events', pathMatch: 'full'},
            {path: '**', redirectTo: '/events', pathMatch: 'full'},

        ])
    ],
    providers: [EventsService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
