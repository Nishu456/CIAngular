import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-missiontheme',
  templateUrl: './missiontheme.component.html',
  styleUrls: ['./missiontheme.component.css']
})
export class MissionthemeComponent implements OnInit {

  missionThemeModel!: FormGroup
  action = 'Add';
  themeId!: number;
  editData!: any;


  constructor(private fb: FormBuilder, private dialogref: MatDialogRef<MissionthemeComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: any, private theme: AdminService){
      this.editData = data;
  }

  ngOnInit(): void {
    this.missionThemeModel = this.fb.group({
      themeName: ['',Validators.required],
      status: ['true']
    });

    if(this.editData != undefined){
      this.themeId = this.editData.themeId;
      this.missionThemeModel.controls["themeName"].setValue(this.editData.themeName);
      if(this.editData.status == 'Active')
        this.missionThemeModel.controls["status"].setValue('true');
      else
        this.missionThemeModel.controls["status"].setValue('false');
      this.action = 'Update';
    }
  }

  get themeName(){
    return this.missionThemeModel.get('themeName');
  }

  get status(){
    return this.missionThemeModel.get('status');
  }

  onSubmit(){
    this.theme.postThemeData(this.missionThemeModel.value, this.themeId)
    .subscribe(
      res => {
        console.log('Success', res)
        if(this.themeId != null){
          Swal.fire('Updated!', 'Mission Theme updated successfully!', 'success'); 
        }
        else{
          Swal.fire('Added!', 'Mission Theme added successfully!', 'success'); 
        }               
        this.dialogref.close();
      },
      error => {
        console.log('Error',error)
        Swal.fire('Error!...', 'Error in mission theme adding, please try again!', 'error');
      }
    )
  }
}
