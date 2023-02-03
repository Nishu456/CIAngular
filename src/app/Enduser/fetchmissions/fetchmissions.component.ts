import { Component, OnInit, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { VolunteerService } from 'src/app/Services/volunteer.service';
import { MatSelectChange } from '@angular/material/select';

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
  searchGrid: string[] = [];
  filterValues: string = "";
  separatorKeyCodes: number[] = [ENTER, COMMA];
  reset = "";

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private volunteer: VolunteerService, private dialog: MatDialog,
          private custompaginator: MatPaginatorIntl){
            custompaginator.itemsPerPageLabel = "Missions Per Page";
          }

  ngOnInit(): void {
    this.getMissionRecords(0, 9);
  }

  getMissionRecords(pageIndex: number, pageSize: number, filterValues?: string){
    this.volunteer.fetchMissions(pageIndex, pageSize, filterValues).subscribe(
      (res: any) => {
        console.log(res);
        
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

  addFilter(event: MatChipInputEvent): void{
    const value = (event.value || '').trim();
    if(value){
      this.searchGrid.push(value.toLowerCase());
    }
    this.filterValues = this.searchGrid.toString();
    this.getMissionRecords(0, 9, this.filterValues);
    event.chipInput!.clear();
  }

  removeFilter(value: string){
    const index = this.searchGrid.indexOf(value);

    if(index >= 0){
      this.searchGrid.splice(index, 1);
    }

    this.filterValues = this.searchGrid.toString();
    this.getMissionRecords(0, 9, this.filterValues);
  }

  add(event: MatSelectChange){
    const value = event.value;
    
    if(value){
      this.searchGrid.push(value.toLowerCase());
    }
    this.filterValues = this.searchGrid.toString();
    this.getMissionRecords(0, 9, this.filterValues);
  }

  clearFilter(){
    this.searchGrid = [];
    this.filterValues = '';
    this.getMissionRecords(0, 9);
  }
}
