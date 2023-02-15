import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VolunteergoalComponent } from '../volunteergoal/volunteergoal.component';
import { VolunteertimeComponent } from '../volunteertime/volunteertime.component';

@Component({
  selector: 'app-volunteertimesheet',
  templateUrl: './volunteertimesheet.component.html',
  styleUrls: ['./volunteertimesheet.component.css']
})
export class VolunteertimesheetComponent {

    timeColumns = ["mission", "date", "hours", "minutes"];
    goalColumns = ["mission", "date", "action"];

    constructor(private dialog: MatDialog){}

    openVolunteerTime(){
        this.dialog.open(VolunteertimeComponent,{
          width: '30%'
        });
    }

    openVolunteerGoal(){
      this.dialog.open(VolunteergoalComponent,{
        width: '30%'
      });
  }
}
