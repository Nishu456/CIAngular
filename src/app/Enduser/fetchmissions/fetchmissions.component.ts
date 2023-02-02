import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { VolunteerService } from 'src/app/Services/volunteer.service';

@Component({
  selector: 'app-fetchmissions',
  templateUrl: './fetchmissions.component.html',
  styleUrls: ['./fetchmissions.component.css']
})
export class FetchmissionsComponent implements OnInit {

  volunteermissions!: any;
  countries!:string[];
  cities!:string[];
  themes!:string[];
  skills!:string[];
  totalcount = 0;
  missionDescription = '';
  organizationDetails = '';
  display = 'grid';

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private volunteer: VolunteerService, private dialog: MatDialog,
          private custompaginator: MatPaginatorIntl){
            custompaginator.itemsPerPageLabel = "Missions Per Page";
          }

  ngOnInit(): void {
    this.getMissionRecords(0, 9)
  }

  getMissionRecords(pageIndex: number, pageSize: number){
    this.volunteer.fetchMissions(pageIndex, pageSize).subscribe(
      (res: any) => {
        this.volunteermissions = res.volnteerMissions;
        this.countries = res.country;
        this.cities = res.city;
        this.themes = res.themes;
        this.skills = res.skills;
        this.totalcount = res.totalCount;
        this.paginator.pageIndex = pageIndex;
        this.paginator.length = this.totalcount;
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }

  FullDescription(MissionDesc:string, missiondescref: any){
    this.missionDescription = MissionDesc;
    let dialogRef = this.dialog.open(missiondescref, {
      width: '500px'
    });
  }

  OrgDetails(OrgDetails:string, orgdetailsref: any){
    this.organizationDetails = OrgDetails;
    let dialogRef = this.dialog.open(orgdetailsref, {
      width: '500px'
    });
  }

  onPagination(event: any){
    console.log(event.pageIndex);
    console.log(event.pageSize);
    this.getMissionRecords(event.pageIndex, event.pageSize)
  }
}
