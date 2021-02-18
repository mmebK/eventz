import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UploaderService} from '../../services/uploader.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {DataService} from '../../services/data.service';

export interface DialogData {
    animal: 'panda' | 'unicorn' | 'lion';
}

function convertDataUrlToBlob(dataUrl): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);/**/

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }/**/

    return new Blob([u8arr], {type: mime});
}

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
    @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    close = false;

    constructor(private dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    ngOnInit(): void {
        this.dataService.image.subscribe(data => this.imageChangedEvent = data);
        console.log('from upload' + this.imageChangedEvent);
    }


    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        console.log(this.croppedImage);
        this.dataService.updateCroppedImage(this.croppedImage);

        const file = new File([convertDataUrlToBlob(this.croppedImage)], 'imageName.png', {type: `image/png`});
        this.dataService.updateFileToUpload(file);
        console.log(file);
        // console.log();

    }

    crop() {
        this.imageCropper.crop();
        /*this.lastCropperPosition = this.getCurrentCropperPosition();
        this.lastCroppedImage = new ElementRef(
            this.imageCropper.sourceImage.nativeElement
        );*/
        this.close = true;
    }

    /* cancelCrop() {
         if (this.lastCroppedImage) {
             this.imageCropper.sourceImage = this.lastCroppedImage;
         }

         if (this.lastCropperPosition) {
             this.imageCropper.cropper = this.getLastCropperPosition();
         }

         this.logoModal.hide();
     }*/

    imageLoaded() {
        // show cropper
    }

    cropperReady() {
        // cropper ready
    }

    loadImageFailed() {
        // show message
    }
}
