import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import Cropper from 'cropperjs';

@Component({
    selector: 'app-image-cropper',
    templateUrl: './image-cropper.component.html',
    styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit {
    @ViewChild('image', {static: false})
    imageElement: ElementRef;

    @Input('src')
    imageSource: string;

    imageDest: string;

    private cropper: Cropper;


    constructor() {
        this.imageDest = '';

    }

    ngOnInit(): void {

    }

    public ngAfterViewInit() {
        this.cropper = new Cropper(this.imageElement.nativeElement, {
            zoomable: false,
            scalable: false,
            aspectRatio: 2,
            crop: () => {
                let canvas = this.cropper.getCroppedCanvas();
                this.imageDest = canvas.toDataURL('image/png');
            }
        });
    }

}
