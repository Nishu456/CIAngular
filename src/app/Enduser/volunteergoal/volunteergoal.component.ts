import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VolunteerService } from 'src/app/Services/volunteer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-volunteergoal',
  templateUrl: './volunteergoal.component.html',
  styleUrls: ['./volunteergoal.component.css']
})
export class VolunteergoalComponent implements OnInit {
  missionList!: any;
  goalModel!: FormGroup;

  constructor(private service: VolunteerService, private fb: FormBuilder,
    private dialogref: MatDialogRef<VolunteergoalComponent>){}

  ngOnInit(): void {
    this.goalModel = this.fb.group({
      missionId: ['', Validators.required],
      date: ['', Validators.required],
      actions: ['', Validators.required],
      message: ['']
    })

    this.service.goalMissionList().subscribe(
      res => {
        console.log(res);        
        this.missionList = res;
      },
      error => {
        console.log(error);        
      }
    )
  }

  get missionId(){
    return this.goalModel.get('missionId');
  }

  get date(){
    return this.goalModel.get('date');
  }

  get actions(){
    return this.goalModel.get('actions');
  }

  get message(){
    return this.goalModel.get('message');
  }

  onSubmit(){
    this.service.upsertVolunteerGoal(this.goalModel.value).subscribe(
      res => {
        Swal.fire('Added', 'Volunteering Goal added Successfully', 'success');
        this.dialogref.close();
      },
      error => {
        console.log(error);        
      }
    );
  }
}
