import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  userData!: any

  constructor(private route: ActivatedRoute, private router: Router, private admin: AdminService){}

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      if(params['action'] !== undefined) {
        if(params['action'] == 'Add')
          Swal.fire('Thank you...', 'User Added Successfully!', 'success');
        else
          Swal.fire('Thank you...', 'User Updated Successfully!', 'success');
        this.setQueryParams();
      }
    });

    this.getUserDatafromServer()
  }

  getUserDatafromServer(){
    this.admin.getAllUserData().subscribe(
      res => {
        this.userData = res;
      },
      error => {
        console.log(error)
      }
    )
  }

  setQueryParams(){
    const qParams: Params = {};
    this.router.navigate([], {
        relativeTo: this.route,
        queryParams: qParams,
        queryParamsHandling: ''
    });
  }

  deleteRecord(data: any){
    Swal.fire({
      title: 'Are you sure want to delete below record?',
      html: 'First Name:' + data.firstName + '<br> Last Name: ' + data.lastName + '<br> Email: ' + data.email,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.admin.deleteUser(data.userId)
        .subscribe(
          res=>{
            console.log('deleted', res);
              Swal.fire(
                'Deleted!',
                'Your Record (Email: ' +data.email+') has been deleted.',
                'success'
              )
              this.getUserDatafromServer()
          },
          error => {
              console.log('Error', error);
              Swal.fire(
              'Oops!',
              'Error in delete record, please try again.',
              'error'
            )
          }
        )
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    })
  }
}
