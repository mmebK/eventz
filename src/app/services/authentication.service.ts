import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {


    host: string = 'http://localhost:8087';
    jwtUpdated: BehaviorSubject<string> = new BehaviorSubject('');
    isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);
    jwt: string;
    userNameUpdated: BehaviorSubject<string> = new BehaviorSubject<string>('');
    userName: string;
    roles: Array<string>;

    constructor(private http: HttpClient) {
    }

    login(data) {

        return this.http.post(this.host + '/login', data, {observe: 'response'});
    }

    readToken() {
        let token = localStorage.getItem('token');
        this.jwtUpdated.next(token);
    }

    saveToken(jwt: string) {
        localStorage.setItem('token', jwt);
        //this.parseJWT();
        //localStorage.setItem('userName', this.userName);
        //this.jwt = jwt;


    }


    isAdmin() {
        if (this.jwtUpdated != null) {
            this.readToken();
            this.parseJWT();
            return this.roles.indexOf('ADMIN') >= 0;
        }

    }

    isUser() {
        if (this.jwtUpdated != null) {
            console.log('from is user' + this.jwtUpdated.value);
            this.readToken();
            this.parseJWT();
            return this.roles.indexOf('USER') >= 0;
        }

    }

    isAuthenticated() {
        // console.log('roles' + this.roles);
        //  console.log('isAdmin' + this.isAdmin());
        //  console.log('isUser' + this.isUser());
        let isAuth = (this.isAdmin() || this.isUser());
        this.authUpdateAuthValue(isAuth);
        return isAuth;
    }

    loadToken() {
        this.jwt = localStorage.getItem('token');
        this.parseJWT();
    }

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        this.initParams();
    }

    register(data) {
        return this.http.post(this.host + '/register', data);
    }

    authUpdateAuthValue(value) {
        this.isAuth.next(value);

    }

    private parseJWT() {
        this.jwtUpdated.subscribe(data => {
            // console.log('daata' + data);
            let jwtHelper = new JwtHelperService();
            let objJWT = jwtHelper.decodeToken(data);
            //console.log(objJWT);
            this.userName = objJWT.sub;
            this.userNameUpdated.next(this.userName);
            localStorage.setItem('userName', this.userName);
            // console.log(this.userName);

            this.roles = objJWT.roles;
        });


    }

    private initParams() {
        this.jwt = null;
        this.userName = null;
        this.roles = null;
    }
}
