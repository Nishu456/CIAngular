import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginModel!:FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, 
    private fb: FormBuilder, private loginservice: AccountService){}

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      if(params['registered'] !== undefined && params['registered'] === 'true') {
        Swal.fire('Thank you...', 'Registration Successful! Please Login!', 'success');
        this.setQueryParams();
      }
    });

    this.loginModel = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get email(){
    return this.loginModel.get('email');
  }

  get password(){
    return this.loginModel.get('password');
  }

  setQueryParams(){
    const qParams: Params = {};
    this.router.navigate([], {
        relativeTo: this.route,
        queryParams: qParams,
        queryParamsHandling: ''
    });
  }

  onSubmit(){
    if(this.loginModel.valid){
      this.loginservice.login(this.loginModel.value)
      .subscribe(
        res => {        
          this.loginservice.setToken(res); 
          this.loginservice.decodeToken();
          // console.log(this.loginservice.getRole())
          if(this.loginservice.getRole() == 'Admin'){
            this.router.navigate(['AdminPage']);
          }
          if(this.loginservice.getRole() == 'User'){
            this.router.navigate(['EndUserPage']);
          }
        },
        error => {
          console.log('Error', error),  
          Swal.fire('Login Failed!...', 'Please enter valid UserName and Password and try again!', 'error');
        }); 
    }
    else{
      console.log('Error in login'),
      Swal.fire('Login Failed!...', 'Please enter valid UserName and Password and try again!', 'error');
    }
   
  }
}
