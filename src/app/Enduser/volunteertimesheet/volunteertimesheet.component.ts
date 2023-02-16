import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VolunteerService } from 'src/app/Services/volunteer.service';
import { VolunteergoalComponent } from '../volunteergoal/volunteergoal.component';
import { VolunteertimeComponent } from '../volunteertime/volunteertime.component';

@Component({
  selector: 'app-volunteertimesheet',
  templateUrl: './volunteertimesheet.component.html',
  styleUrls: ['./volunteertimesheet.component.css']
})
export class VolunteertimesheetComponent implements OnInit {

    timeColumns = ["mission", "date", "hours", "minutes", "task"];
    goalColumns = ["mission", "date", "action", "task"];
    volunteerTime!: any;
    volunteerGoal!: any;
    
    constructor(private dialog: MatDialog, private timesheet: VolunteerService){}

  ngOnInit(): void {
    this.getVolunteerTimesheet();
  }

    openVolunteerTime(data?: any){
        this.dialog.open(VolunteertimeComponent,{
          width: '30%',
          disableClose: true,
          data: data
        });
    }

    openVolunteerGoal(data?: any){
      this.dialog.open(VolunteergoalComponent,{
        width: '30%',
        disableClose: true,
        data: data
      });
  }

  getVolunteerTimesheet(){
    this.timesheet.getVolunteerTimeSheet().subscribe(
      (res: any) => {
        console.log(res);        
        this.volunteerTime = res.volunteerTime;
        this.volunteerGoal = res.volunteerGoal;
      },
      error => {
        console.log(error);        
      }
    )
  }

  deleteVolunteerTime(data: any){}

  deleteVolunteerGoal(data: any){}
}
