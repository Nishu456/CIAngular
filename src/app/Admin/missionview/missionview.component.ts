import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ImissionData } from 'src/app/Interfaces/ICI';
import { MissionComponent } from '../mission/mission.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-missionview',
  templateUrl: './missionview.component.html',
  styleUrls: ['./missionview.component.css']
})
export class MissionviewComponent implements OnInit{
  missionData: MatTableDataSource<ImissionData> = new MatTableDataSource<ImissionData>();
  displayedColumns: string[] = ['missionTitle','missionType','startDate','endDate','action'];
  totalRecords!: number;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private mission: AdminService, private dialog: MatDialog){
   }

  ngOnInit(): void {
    this.getMissionDatafromServer(0,5);    
  }

  // ngAfterViewInit() {
  //   // this.missionData.paginator = this.paginator;
  //   // this.missionData.sort = this.sort;
  //   setTimeout(() => this.missionData.paginator = this.paginator, 1000);
  //   setTimeout(() => this.missionData.sort = this.sort, 1000);
  // }

  getMissionDatafromServer(pageIndex: number, pageSize: number, filterValue: string = ""){
    this.mission.getAllMissionData(pageIndex, pageSize, filterValue).subscribe(
      (res: any) => {
        this.missionData = new MatTableDataSource(res.missions);
        this.totalRecords = res.totalRecords;
        setTimeout(() => this.missionData.paginator = this.paginator, 500);
        setTimeout(() => this.missionData.sort = this.sort, 500);
        setTimeout(() => {
          this.paginator.pageIndex = pageIndex;
          this.paginator.length = this.totalRecords;
        },500)
      },
      error => {
        console.log('error', error)
      }
    );
  }
  
  deleteRecord(mission:any){
    Swal.fire({
      title: 'Are you sure you want to delete this mission?',
      text: 'Mission Title: '+mission.missionTitle,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if(result.value){
        this.mission.deleteMission(mission.missionId).subscribe(
          res => {
            Swal.fire(
              'Deleted!',
              'Your Record (Mission Title: ' +mission.missionTitle+') has been deleted.',
              'success'
            )
            this.getMissionDatafromServer(0,5);
          },
          error => {
            console.log('error', error);
            Swal.fire(
              'Oops!',
              'Error in delete record, please try again.',
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

  applyFilter(value: string){
    const filterValue = value;
    this.getMissionDatafromServer(0,5,filterValue.trim().toLowerCase());
    // this.missionData.filter = filterValue.trim().toLowerCase();
    // if(this.missionData.paginator){
    //   this.missionData.paginator.firstPage();
    // }
  }

  openUpsertMission(missionId?: number){
    this.dialog.open(MissionComponent, {
      width: '50%',
      data: missionId
  }).afterClosed().subscribe(() => {
       this.getMissionDatafromServer(0,5);
       console.log(this.missionData.paginator);
      //  if(this.missionData.paginator){
      //   this.missionData.paginator.lastPage();
      // }
     });
  }

  onPagination(event: any, filterValue: string){
    this.getMissionDatafromServer(event.pageIndex, event.pageSize, filterValue);
  }
}
