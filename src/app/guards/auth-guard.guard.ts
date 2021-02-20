import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
    constructor(private route: Router, private auth: AuthenticationService) {
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.auth.loadToken();
        if (!this.auth.isAuthenticated()) {
            this.route.navigateByUrl('login');
            return false;
        }

        return true;


    }

}
