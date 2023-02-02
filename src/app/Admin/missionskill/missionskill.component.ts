import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { skipLast } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-missionskill',
  templateUrl: './missionskill.component.html',
  styleUrls: ['./missionskill.component.css']
})
export class MissionskillComponent implements OnInit {
  missionSkillModel!: FormGroup
  action = 'Add';
  skillId!: number
  skillData!: any

  constructor(private fb: FormBuilder, private skill: AdminService,
    private dialogref: MatDialogRef<MissionskillComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any){
      this.skillData = data
  }

  ngOnInit(): void {
    this.missionSkillModel = this.fb.group({
      skillTitle: ['',Validators.required],
      status: ['true']
    });

    if(this.skillData != undefined){
      this.skillId = this.skillData.skillId;
      this.missionSkillModel.controls["skillTitle"].setValue(this.skillData.skillTitle);
      if(this.skillData.status == 'Active')
        this.missionSkillModel.controls["status"].setValue('true');
      else
        this.missionSkillModel.controls["status"].setValue('false');
      this.action = 'Update';
    }
  }

  get skillTitle(){
    return this.missionSkillModel.get('skillTitle');
  }

  get status(){
    return this.missionSkillModel.get('status');
  }

  onSubmit(){
    this.skill.postSkillData(this.missionSkillModel.value, this.skillId).subscribe(
      res => {
        console.log('Success', res)
        if(this.skillId != null){
          Swal.fire('Updated!', 'Mission Skill updated successfully!', 'success'); 
        }
        else{
          Swal.fire('Added!', 'Mission Skill added successfully!', 'success'); 
        }               
        this.dialogref.close();
      },
      error => {
        console.log('Error',error)
        Swal.fire('Error!...', 'Error in mission skill adding, please try again!', 'error');
      }
    )
  }
}
