import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  cityList!: any;
  countryList!: any;
  departmentList!: any;
  userModel!: FormGroup;
  userId!: number;
  action!: string;
  constructor(private admin: AdminService, private fb: FormBuilder, 
    private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
      
    this.userModel = this.fb.group({
        firstName: ['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        lastName: ['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        email: ['',[Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
        employeeId: ['',[Validators.required]],
        departmentId: ['',[Validators.required]],
        countryId: ['',[Validators.required]],
        cityId: ['',[Validators.required]],
        profileSummary: [''],
        status: ['true']
      })

      this.route.queryParams
      .subscribe(params => {
        if(params['id'] !== undefined) {
          this.userId = params['id'];
          this.admin.getUserData(this.userId).subscribe(
            (res: any) => {
              this.userModel.controls["firstName"].setValue(res.userRequest.firstName); 
              this.userModel.controls["lastName"].setValue(res.userRequest.lastName); 
              this.userModel.controls["email"].setValue(res.userRequest.email); 
              this.userModel.controls["employeeId"].setValue(res.userRequest.employeeId); 
              this.userModel.controls["departmentId"].setValue(res.userRequest.departmentId);
              this.userModel.controls["countryId"].setValue(res.userRequest.countryId); 
              this.userModel.controls["cityId"].setValue(res.userRequest.cityId);
              this.userModel.controls["profileSummary"].setValue(res.userRequest.profileSummary);
              this.userModel.controls["status"].setValue(res.userRequest.status);
              this.cityList = res.cityList;
              this.countryList = res.countryList;
              this.departmentList = res.departmentList;
              this.action = 'Update';
              const password = this.userModel.get('password');
              password?.clearValidators();
              password?.updateValueAndValidity();
              }, 
            (error: any) => {
              console.log('Error', error);
            } );
        }
        else{
          this.admin.getUserData()
          .subscribe(
            (res: any) => {
              this.cityList = res.cityList;
              this.countryList = res.countryList;
              this.departmentList = res.departmentList;
              this.action = 'Add';
              }, 
            (error: any) => {
              console.log('Error', error);
            } );   
        }
      });         
  }

  get firstName(){
    return this.userModel.get('firstName');
  }

  get lastName(){
    return this.userModel.get('lastName');
  }

  get email(){
    return this.userModel.get('email');
  }

  get password(){
    return this.userModel.get('password');
  }

  get employeeId(){
    return this.userModel.get('employeeId');
  }

  get departmentId(){
    return this.userModel.get('departmentId');
  }

  get countryId(){
    return this.userModel.get('countryId');
  }

  get cityId(){
    return this.userModel.get('cityId');
  }

  get status(){
    return this.userModel.get('status');
  }

  onSubmit(){
    this.admin.postUserData(this.userModel.value, this.userId)
    .subscribe(
      (res: any) => {
        console.log('success', res);
        this.router.navigate(['AdminPage/User'], {queryParams: { action: this.action } });
      },
      (error: any) => {
        console.log('error', error);
        Swal.fire('OOPS!!...', 'Error in Adding User! Please try again!', 'error');
      }
    )
  }

  bindCityList(){    
    this.userModel.controls["cityId"].setValue('');
    this.admin.getCityData(this.countryId?.value)
    .subscribe(
      (res: any) => {
        this.cityList = res;
        }, 
      (error: any) => {
        console.log('Error', error);
      } );  
  }
}
