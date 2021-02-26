import {FormControl, ValidationErrors} from '@angular/forms';

export class FormValidators {

    static onlineUrl(control: FormControl): ValidationErrors {


        const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var re = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        if ((control.value != '') && (!re.test(control.value))) {

            console.log(control.value);
            // invalid, return error object
            console.log('Successful match');
            return {'onlineUrl': true};
        } else {
            // valid, return null
            console.log('not successful match');
            return null;
        }
    }
}
