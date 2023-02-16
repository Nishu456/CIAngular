import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VolunteerService } from 'src/app/Services/volunteer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-volunteertime',
  templateUrl: './volunteertime.component.html',
  styleUrls: ['./volunteertime.component.css']
})
export class VolunteertimeComponent implements OnInit {
  missionList!: any;
  timeModel!: FormGroup;
  timeData!: any;
  timeId!: number;

  constructor(private service: VolunteerService, private fb: FormBuilder,
    private dialogref: MatDialogRef<VolunteertimeComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any){
      this.timeData = data;
  }

  ngOnInit(): void {

    this.timeModel = this.fb.group({
      missionId: ['', Validators.required],
      date: ['', Validators.required],
      hours: ['', Validators.required],
      minutes: ['', Validators.required],
      message: ['']
    })

    if(this.timeData != undefined){
      this.timeId = this.timeData.volunteerId;
      this.timeData.controls["missionId"].setValue(this.timeData.missionId.toString());
      this.timeData.controls["date"].setValue(this.timeData.date);
      this.timeData.controls["hours"].setValue(this.timeData.hours);
      this.timeData.controls["minutes"].setValue(this.timeData.minutes);
      this.timeData.controls["message"].setValue(this.timeData.message);      
    }

    this.service.timeMissionList().subscribe(
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
    return this.timeModel.get('missionId');
  }

  get date(){
    return this.timeModel.get('date');
  }

  get hours(){
    return this.timeModel.get('hours');
  }

  get minutes(){
    return this.timeModel.get('minutes');
  }

  get message(){
    return this.timeModel.get('message');
  }

  onSubmit(){
    this.service.upsertVolunteerTime(this.timeModel.value).subscribe(
      res => {
        Swal.fire('Added', 'Volunteering Hours added Successfully', 'success');
        this.dialogref.close();
      },
      error => {
        console.log(error);        
      }
    );
  }
}
