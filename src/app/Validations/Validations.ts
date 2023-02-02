import {AbstractControl} from '@angular/forms';

export function passwordValidate(control: AbstractControl): {[key: string]: boolean} | null{
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if(password?.pristine || confirmPassword?.pristine)
        return null;

    return (password && confirmPassword && password.value != confirmPassword.value) ? {'misMatch': true} : null;
}

export function imgValidate(control: AbstractControl): {[key: string]: boolean} | null{
    console.log(control)
    if(control.value){
        if(control.value[0]){
            let valToLower = control.value[0].name.toLowerCase();
            let regex = new RegExp("(.*?)\.(jpg|png|jpeg)$");
            let regexTest = regex.test(valToLower);
            return !regexTest ? { "notSupportedFileType": true } : null;
        }
    }
    return null
} 


