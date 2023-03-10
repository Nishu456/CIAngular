import { Component, OnInit, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { VolunteerService } from 'src/app/Services/volunteer.service';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { HttpEventType } from '@angular/common/http';
import { MatOption } from '@angular/material/core';
import { Router } from '@angular/router';
import { VolunteermissionComponent } from '../volunteermission/volunteermission.component';
import Swal from 'sweetalert2';
import { VolunteertimeComponent } from '../volunteertime/volunteertime.component';

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
  dataprogress!: number;
  isLoading!: boolean;
  favMissionId: number[] = [];
  sortBy: string = "";
  rating: number = 0;
  
  @ViewChild('countrydd') countrydd!: MatSelect;
  @ViewChild('citydd') citydd!: MatSelect;
  @ViewChild('themedd') themedd!: MatSelect;
  @ViewChild('skilldd') skilldd!: MatSelect;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private volunteer: VolunteerService, private dialog: MatDialog,
          private custompaginator: MatPaginatorIntl, private router: Router){
            custompaginator.itemsPerPageLabel = "Missions Per Page";
          }

  ngOnInit(): void {
    this.getMissionRecords(0, 6);
  }

  getMissionRecords(pageIndex: number, pageSize: number, filterValues?: string, orderBy?: string){
    this.volunteer.fetchMissions(pageIndex, pageSize, filterValues, orderBy).subscribe(
      (event: any) => {
        if(event.type === HttpEventType.DownloadProgress){
          this.isLoading = true;
          this.dataprogress = Math.round(100 * event.loaded / event.total);
        }
        else if(event.type === HttpEventType.Response){          
          this.isLoading = false;
          setTimeout(() => this.volunteermissions = event.body.volnteerMissions, 500);
          this.countries = event.body.country;
          this.cities = event.body.city;
          this.themes = event.body.themes;
          this.skills = event.body.skills;
          this.totalcount = event.body.totalCount;
          this.favMissionId = event.body.favMissions;
          setTimeout(() => this.paginator.pageIndex = pageIndex, 500);
          setTimeout(() => this.paginator.length = this.totalcount, 500);
        }
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
    this.getMissionRecords(event.pageIndex, event.pageSize, this.filterValues, this.sortBy)
  }

  addFilter(event: MatChipInputEvent): void{
    const value = (event.value || '').trim();
    if(value){
      this.searchGrid.push(value.toLowerCase());
    }
    this.filterValues = this.searchGrid.toString();
    this.getMissionRecords(0, 6, this.filterValues, this.sortBy);
    event.chipInput!.clear();
  }

  removeFilter(value: string){
    const index = this.searchGrid.indexOf(value);

    if(index >= 0){
      this.searchGrid.splice(index, 1);
    }
    this.filterValues = this.searchGrid.toString();
    this.getMissionRecords(0, 6, this.filterValues, this.sortBy);
  }

  add(event: MatSelectChange){
    const value = event.value;
    
    if(value){
      this.searchGrid.push(value.toLowerCase());
    }
    this.filterValues = this.searchGrid.toString();  
    this.countrydd.options.forEach((data: MatOption) => data.deselect());
    this.citydd.options.forEach((data: MatOption) => data.deselect());
    this.themedd.options.forEach((data: MatOption) => data.deselect());
    this.skilldd.options.forEach((data: MatOption) => data.deselect()); 
    this.getMissionRecords(0, 6, this.filterValues, this.sortBy);
  }

  clearFilter(){
    this.searchGrid = [];
    this.filterValues = "";
    this.getMissionRecords(0, 6, this.filterValues, this.sortBy);
  }

  addtoFavorite(missionId: number){
    this.volunteer.upsertFavMissions(missionId).subscribe(
      res => {
        this.favMissionId.push(missionId);
        console.log(res)},
      error => console.log(error)
    );
  }

  removeFavorite(missionId: number){
    this.volunteer.removeFavMissions(missionId).subscribe(
      res => {
        const index = this.favMissionId.indexOf(missionId);

        if(index >= 0){
          this.favMissionId.splice(index, 1);
        }
        console.log(res)},
      error => console.log(error)
    );
  }

  orderBy(event: MatSelectChange){
    const value = event.value;

    if(value){
      this.sortBy = value;
      this.getMissionRecords(0, 6, this.filterValues, this.sortBy);
    }   
  }

   DetailVolunteerMission(mission: any){
    this.dialog.open(VolunteermissionComponent, {
      width: '75%',
      height: '75%',
      data: mission
  });
    //this.router.navigate(['EndUserPage/volunteermission',{mission:mission}])
    //this.router.navigate(['EndUserPage/volunteermission'], {state: { mission: mission } });
  }

  RateMission(missionId: number, rating: number){
    if(rating > 0){
      this.volunteer.missionRating(missionId, rating).subscribe(
        res => console.log(res),
        error => console.log(error)        
      );
    }      
  }

  missionApply(missionId: number, missionTitle: string){
    Swal.fire({
      title: 'Are you sure you want to apply for this mission?',
      text: 'Mission Title: '+missionTitle,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Apply',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if(result.value){
        this.volunteer.missionVolunteering(missionId).subscribe(
          res => {
            Swal.fire(
              'Applied!',
              'You application for Mission ('+missionTitle+') Successfully Applied.',
              'success'
            )
            //this.getMissionRecords(0, 6, this.filterValues, this.sortBy);
          },
          error => {
            console.log('error', error);
            Swal.fire(
              'Oops!',
              'Error in mission application, please try again.',
              'error'
            );
          }
        )
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    })    
  }
}
