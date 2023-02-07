import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { passwordValidate } from 'src/app/Validations/Validations';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerModel!:FormGroup 

  constructor(private fb: FormBuilder, private regservice: AccountService, private router: Router){}

    ngOnInit(): void {
      this.registerModel = this.fb.group({
        firstName: ['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        lastName: ['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        phoneNumber: ['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['',[Validators.required, Validators.email]],
        password: ['',[Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
        confirmPassword: ['',[Validators.required]] 
      }, {validator: passwordValidate});
    }
  
  get firstName(){
    return this.registerModel.get('firstName');
  }

  get lastName(){
    return this.registerModel.get('lastName');
  }

  get phoneNumber(){
    return this.registerModel.get('phoneNumber');
  }

  get email(){
    return this.registerModel.get('email');
  }

  get password(){
    return this.registerModel.get('password');
  }

  get confirmPassword(){
    return this.registerModel.get('confirmPassword');
  }

  onSubmit(){
    if(this.registerModel.valid){
      this.regservice.register(this.registerModel.value)
      .subscribe(
        res => {
          console.log('Success',res),          
          this.router.navigate(['Account/Login'], {queryParams: { registered: 'true' } });
          }, 
        error => {
          console.log('Error', error);
          if(error.error.errors[0].code == 'DuplicateUserName'){
            Swal.fire('Duplicate Email!!...', 'Please enter unique email!', 'warning');
          }
          else{
            Swal.fire('OOPS!!...', 'Error in Registration! Please try again!', 'error');
          }          
        } );         
    }
    else{
      console.log('Form Not Valid!!');
      Swal.fire('OOPS!!...', 'Error in Registration! Please try again!', 'error');
    }
      
  }
}
