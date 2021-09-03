import {Component, OnInit} from '@angular/core';
import {UploaderService} from '../../services/uploader.service';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

    progress: number;
    infoMessage: any;
    isUploading: boolean = false;
    file: File;

    imageUrl: string | ArrayBuffer =
        'http://bulma.io/images/placeholders/480';

    fileName: string = 'No file selected';

    constructor(private uploader: UploaderService) {
    }

    ngOnInit() {
        this.uploader.progressSource.subscribe(progress => {
            this.progress = progress;
        });
    }

    onChange(file: File) {
        if (file) {
            this.fileName = file.name;
            this.file = file;

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = event => {
                this.imageUrl = reader.result;
            };
        }
    }

    onUpload() {
        this.infoMessage = null;
        this.progress = 0;
        this.isUploading = true;

        this.uploader.upload(this.file).subscribe(message => {
            this.isUploading = false;
            this.infoMessage = message;
        });
    }

}
