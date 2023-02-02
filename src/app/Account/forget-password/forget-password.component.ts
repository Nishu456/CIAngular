import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordModel!: FormGroup;  

  constructor(private fb: FormBuilder, private forgetpassService: AccountService){}

  ngOnInit(): void {
    this.forgetPasswordModel = this.fb.group({
      email: ['',[Validators.required]],
      clientURI: [window.location.href.replace(window.location.href.split('/')[3],'resetPassword')]
    });
  }

  get email(){
    return this.forgetPasswordModel.get('email');
  }

  onSubmit(){
    this.forgetpassService.forgetPassword(this.forgetPasswordModel.value)
    .subscribe(
      res => {
        console.log('Success', res);
        Swal.fire('Success...', 'The link has been sent, please check you email to reset password!!', 'success');
      },
      error => {
        console.log('Error', error);
        Swal.fire('Error...', 'Please enter valid email for reset password!!', 'error');
      }
    )
  }
}
