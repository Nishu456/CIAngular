import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IthemeData } from 'src/app/Interfaces/ICI';
import { AdminService } from 'src/app/Services/admin.service';
import Swal from 'sweetalert2';
import { MissionthemeComponent } from '../missiontheme/missiontheme.component';

@Component({
  selector: 'app-missionthemeview',
  templateUrl: './missionthemeview.component.html',
  styleUrls: ['./missionthemeview.component.css']
})
export class MissionthemeviewComponent implements OnInit {

  themedata: MatTableDataSource<IthemeData> = new MatTableDataSource<IthemeData>();
  themeColumns = ["themeName", "status", "action"];
  totalRecords!: number;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private dialog: MatDialog, private theme: AdminService){}

  ngOnInit(): void {
    this.getMissionThemes(0, 5);
  }

  getMissionThemes(pageIndex:number, pageSize:number){
    this.theme.getMissionThemes(pageIndex, pageSize).subscribe(
      (res:any) =>{
        this.themedata = new MatTableDataSource(res.missionThemes);
        this.totalRecords = res.totalCount;
        setTimeout(() => this.themedata.paginator = this.paginator, 500);
        setTimeout(() => this.themedata.sort = this.sort, 500);
        setTimeout(() => {
          this.paginator.pageIndex = pageIndex;
          this.paginator.length = this.totalRecords;
        },500)
      },
      error =>{
        console.log('Error', error);
      }
    )
  }
  
  applyFilter(value:string){
    const filterValue = value;
    this.themedata.filter = filterValue.trim().toLowerCase();
    if(this.themedata.paginator){
      this.themedata.paginator.firstPage();
    }
  }

  openUpsertMissionTheme(themeRecord?: any){
    this.dialog.open(MissionthemeComponent,{
      width: '30%',
      data: themeRecord,
      disableClose: true
    }).afterClosed().subscribe(() => {
      this.getMissionThemes(0,5);
      console.log(this.themedata.paginator);
     //  if(this.missionData.paginator){
     //   this.missionData.paginator.lastPage();
     // }
    });
  }

  deleteRecord(record: any){
    Swal.fire({
      title: 'Are you sure you want to delete this mission theme?',
      text: 'Theme Name: '+record.themeName,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if(result.value){
        this.theme.deleteTheme(record.themeId).subscribe(
          res => {
            Swal.fire(
              'Deleted!',
              'Your Record (Theme Name: ' +record.themeName+') has been deleted.',
              'success'
            )
            this.getMissionThemes(0,5);
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
      }
    })
  }

  onPagination(event: any){
    this.getMissionThemes(event.pageIndex, event.pageSize);
  }
}
