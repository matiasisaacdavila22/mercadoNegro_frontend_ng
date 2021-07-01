import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { ChangePasswordModel } from 'src/app/models/security/change-password.model';
import { SecurityService } from 'src/app/services/security.service';

declare const showMessage: any;
declare const initSidenav: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  fgValidator!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private router:Router
     ) { }

  ngOnInit(): void {
    this.FormBuilder();
  }

  FormBuilder(){
    this.fgValidator = this.fb.group({
      email: ['', [Validators.required,Validators.email, Validators.maxLength(30)]],
      password: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(35)]],
      passwordNew: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(35)]],
      passwordNew2: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(35)]],
     })
  }

  changePasswordFn(){
    if(this.fgValidator.invalid || (this.fgv.passwordNew.value != this.fgv.passwordNew2.value)){
      console.log(this.fgv.passwordNew + '  '+ this.fgv.passwordNew2)
      showMessage('Invalid form');
    }else{
      let model = this.getPasswordData();
     this.service.changePassword(model).subscribe(
       data => {
        showMessage('your password has been change successfull')
        this.router.navigate(['/home'])
      },
       error => {
         showMessage('error identifying:')
       }
     );

    }
  }

  getPasswordData(): ChangePasswordModel{
    let model = new ChangePasswordModel();
      model.email = this.fgv.email.value;
      model.password = MD5(this.fgv.password.value).toString();
      model.passwordNew = MD5(this.fgv.passwordNew.value).toString();
      return model;
  }

  get fgv(){
    return this.fgValidator.controls;
  }

}
