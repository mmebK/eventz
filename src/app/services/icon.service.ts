import {Injectable} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class IconService {

    constructor(private matIcon: MatIconRegistry, private domSanitizer: DomSanitizer) {


    }

}
