import {Form, FormControl, NG_VALIDATORS, Validator} from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[ImageTypeValidator]',
    providers: [{
        provide: NG_VALIDATORS, useExisting: ImageTypeValidator, multi:true
    }]
})

export class ImageTypeValidator implements Validator{
    static validate: any | string;
    // static validate(c: FormControl): {[key: string]: any}|null{
    //     if(c.value){
    //         if(c.value[0]){
    //             return ImageTypeValidator.checkExtension(c);
    //         }
    //     }
    //     return null
    // }

    private static checkExtension(c: FormControl){
        let valToLower = c.value[0].name.toLowerCase();
        let regex = new RegExp("(.*?)\.(jpg|png|jpeg)$");
        let regexTest = regex.test(valToLower);
        return !regexTest ? { "notSupportedFileType": true } : null;
      }

    validate(c: FormControl): {[key: string]: any}| null{
        console.log(c.value);
        if(c.value){
            if(c.value[0]){
                return ImageTypeValidator.checkExtension(c);
            }
        }
        return null
    }
}