import {Component} from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  
  file:any;

  constructor(private demo: AdminService){
  }

  getFile(event: any){

       

    const formData = new FormData();
    for  (var i =  0; i <  event.target.files.length; i++)  { 
      let fileUpload = <File>event.target.files[i]; 
      formData.append("files",  fileUpload, fileUpload.name);
  } 
    console.log(formData);
    this.demo.uploadFiles(formData).subscribe(
      (res: any) => {
        console.log('Success', res)
      },
      error => {
        console.log('Error', error)          
      }
    )
  }

}
