import { Component } from '@angular/core';

@Component({
  selector: 'app-volunteertimesheet',
  templateUrl: './volunteertimesheet.component.html',
  styleUrls: ['./volunteertimesheet.component.css']
})
export class VolunteertimesheetComponent {

    timeColumns = ["mission", "date", "hours", "minutes"];
    goalColumns = ["mission", "date", "action"];
}
