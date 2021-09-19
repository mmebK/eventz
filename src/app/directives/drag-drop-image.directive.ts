import {Directive, HostBinding, Output, EventEmitter, HostListener} from '@angular/core';
import {EventsCreationComponent} from '../components/events-creation/events-creation.component';
import {combineAll} from 'rxjs/operators';

@Directive({
    selector: '[dropzone]'
})
export class DragDropImageDirective {
    @Output() onFileDropped = new EventEmitter<any>();

    @HostBinding('style.background-color') private background = '#f5fcff';
    @HostBinding('style.opacity') private opacity = '1';

    //Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#9ecbec';
        this.opacity = '0.8';
    }

    //Dragleave listener
    @HostListener('dragleave', ['$event'])
    public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff';
        this.opacity = '1';
    }

    //Drop listener
    @HostListener('drop', ['$event'])
    public ondrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff';
        this.opacity = '1';
        let files = evt.value;

        this.onFileDropped.emit(files);
    }
}
