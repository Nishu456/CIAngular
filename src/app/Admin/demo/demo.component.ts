import {Component} from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { AdminService } from 'src/app/Services/admin.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  
  // file:any;

  // constructor(private demo: AdminService){
  // }

  // getFile(event: any){

       

  //   const formData = new FormData();
  //   for  (var i =  0; i <  event.target.files.length; i++)  { 
  //     let fileUpload = <File>event.target.files[i]; 
  //     formData.append("files",  fileUpload, fileUpload.name);
  // } 
  //   console.log(formData);
  //   this.demo.uploadFiles(formData).subscribe(
  //     (res: any) => {
  //       console.log('Success', res)
  //     },
  //     error => {
  //       console.log('Error', error)          
  //     }
  //   )
  // }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  }
}
