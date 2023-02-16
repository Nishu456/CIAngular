import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/Services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-missionapplication',
  templateUrl: './missionapplication.component.html',
  styleUrls: ['./missionapplication.component.css']
})
export class MissionapplicationComponent implements OnInit{
  
  missionApplication!: any;
  aaplicationColumns = ["missionTitle", "missionId", "userId", "userName", "appliedDate", "action"];
  //applicationSt = false;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private application: AdminService){}

  ngOnInit(): void {
    this.getMissionApplication();
  }

  getMissionApplication(){
    this.application.getMissionApplication().subscribe(
      (res: any) => {
        this.missionApplication = new MatTableDataSource(res);
        //this.totalRecords = res.totalRecords;
        setTimeout(() => this.missionApplication.paginator = this.paginator, 500);
        setTimeout(() => this.missionApplication.sort = this.sort, 500);
        // setTimeout(() => {
        //   this.paginator.pageIndex = pageIndex;
        //   this.paginator.length = this.totalRecords;
        // },500)
      },
      error => {
        console.log('error', error)
        // if(error.error.status == 400 && error.error.title == 'Bad Request'){
        //   this.router.navigate(['../error'],{relativeTo: this.route})
        // }
      }
    );
  }

  applyFilter(filterValue: string){}

  applicationStatus(volunteerId: number, status: string){
    this.application.updateApplication(volunteerId, status).subscribe(
      res => {
        if(status === 'Accepted'){
          Swal.fire('Accepted', 'Application accepted successfully', 'success');
        }
        else{
          Swal.fire('Accepted', 'Application declined successfully', 'success');
        }
      },
      error => {
        console.log(error),
        Swal.fire('Error', 'Something went wrong!!!', 'error');
      }
    )
  }
}
