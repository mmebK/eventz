import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    jwt: BehaviorSubject<string> = new BehaviorSubject('');
    locationSearch: BehaviorSubject<string> = new BehaviorSubject('');
    image: BehaviorSubject<string> = new BehaviorSubject('');
    croppedImage: BehaviorSubject<string> = new BehaviorSubject('');
    fileToUpload: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
    currentJwt = this.jwt.asObservable();
    categorySearch: BehaviorSubject<String> = new BehaviorSubject<String>('');
    private data = new Subject<any>();
    currentData = this.data.asObservable();

    constructor() {
    }


    updateData(item: any) {
        this.data.next(item);
    }


    updateCroppedImage(image: any) {
        this.croppedImage.next(image);
    }

    updateJwt(item: any) {
        this.jwt.next(item);
    }

    updateImage(imageChangedEvent: any) {
        this.image.next(imageChangedEvent);
    }

    updateFileToUpload(file: any) {
        this.fileToUpload.next(file);
    }

    updateLocationSearch(location: string) {
        this.locationSearch.next(location);
    }

    updateCategorySearch(category: string) {
        this.categorySearch.next(category);
    }
}
