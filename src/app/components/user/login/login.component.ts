import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {DataService} from '../../../services/data.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @ViewChild('container') container: ElementRef;

    login: FormGroup;
    register: FormGroup;


    authenticated: boolean;

    constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router, private data: DataService) {
    }


    ngOnInit(): void {
        this.login = this.fb.group({
            userName: ['', Validators.required],
            passWord: ['', Validators.required]
        });

        this.register = this.fb.group({
            userName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            passWord: ['', Validators.required]
        });


    }

    loginUser(data) {
        console.log(data);
        this.auth.login(data).subscribe(resp => {
            let jwt = resp.headers.get('Authorization');
            this.auth.saveToken(jwt);
            this.auth.readToken();


            if (this.auth.isAuthenticated()) {
                console.log('is auth' + this.auth.isAuthenticated());
                this.router.navigateByUrl('/events');
                //window.location.reload();
            }
        });


    }

    isAdmin() {
        return this.auth.isAdmin();
    }

    isUser() {
        return this.auth.isUser();
    }

    registerUser(data) {
        this.auth.register(data).subscribe(() => console.log('user registered'));
    }

    signUp() {
        this.container.nativeElement.classList.add('sign-up-mode');
        /*console.log('here');
        this.auth.readToken();
        this.auth.jwtUpdated.subscribe(data => console.log(data));*/
        console.log(this.auth.isAuthenticated());
    }

    signIn() {
        this.container.nativeElement.classList.remove('sign-up-mode');
    }


}
