import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-volunteermission',
  templateUrl: './volunteermission.component.html',
  styleUrls: ['./volunteermission.component.css']
})
export class VolunteermissionComponent implements OnInit {

  missionRecord!: any;

  constructor(private router: Router, private route: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) private Data: any){
          this.missionRecord = Data;
  }

  ngOnInit(): void {


    // this.route.queryParams
    // .subscribe(params => {
    //   if(params['mission'] !== undefined) {
    //     this.missionRecord = JSON.parse(params['mission']);
    //     console.log(JSON.parse(params['mission']));
        
    //   }
    // });
  }
}
