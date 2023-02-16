import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IskillData } from 'src/app/Interfaces/ICI';
import { AdminService } from 'src/app/Services/admin.service';
import Swal from 'sweetalert2';
import { MissionskillComponent } from '../missionskill/missionskill.component';

@Component({
  selector: 'app-missionskillview',
  templateUrl: './missionskillview.component.html',
  styleUrls: ['./missionskillview.component.css']
})
export class MissionskillviewComponent implements OnInit {
  
  skillData: MatTableDataSource<IskillData> = new MatTableDataSource<IskillData>();
  skillColumns = ["skillTitle", "status", "action"];
  totalRecords!: number;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator
  @ViewChild(MatSort, {static: false}) sort!: MatSort


  constructor(private dialog: MatDialog, private skill: AdminService){  }

  ngOnInit(): void {
    this.getMissionSkills(0,5);
  }

  getMissionSkills(pageIndex: number, pageSize: number){
    this.skill.getMissionSkills(pageIndex, pageSize).subscribe(
      (res: any) => {
        this.skillData = new MatTableDataSource(res.missionSkills)
        this.totalRecords = res.totalCount;
        setTimeout(() => this.skillData.paginator = this.paginator, 500);
        setTimeout(() => this.skillData.sort = this.sort, 500);
        setTimeout(() => {
          this.paginator.pageIndex = pageIndex;
          this.paginator.length = this.totalRecords;
        },500)
      },
      error =>{
        console.log('Error', error);
      }
      );
  }
  
  applyFilter(value: string){
    const filterValue = value;
    this.skillData.filter = filterValue.trim().toLowerCase();
    if(this.skillData.paginator){
      this.skillData.paginator.firstPage();
    }
  }

  openUpsertMissionSkill(skillRecord?: any){
    this.dialog.open(MissionskillComponent,{
      width: '30%',
      data: skillRecord,
      disableClose: true
    }).afterClosed().subscribe(() => {
      this.getMissionSkills(0,5);
    });
  }

  deleteRecord(record: any){
    Swal.fire({
      title: 'Are you sure you want to delete this mission theme?',
      text: 'Skill Title: '+record.skillTitle,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if(result.value){
        this.skill.deleteSkill(record.skillId).subscribe(
          res => {
            Swal.fire(
              'Deleted!',
              'Your Record (Skill Title: ' +record.skillTitle+') has been deleted.',
              'success'
            )
            this.getMissionSkills(0,5);
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
    this.getMissionSkills(event.pageIndex, event.pageSize);
  }
}
