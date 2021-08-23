import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { PasswordResetModel } from 'src/app/models/security/password-reset.models';
import { StoreModel } from 'src/app/models/store/store.model';
import { SecurityService } from 'src/app/core/services/security/security.service';

declare const showMessage: any;
declare const initSidenav: any;

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

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
     })
  }

 PasswordResetFn(){
    if(this.fgValidator.invalid){
      showMessage('Invalid form');
    }else{
      let model = this.getPasswordData();
     this.service.PasswordReset(model).subscribe(
       data => {
         this.service.saveSessionData(data);
        showMessage('Welcome to yout account')
        this.router.navigate(['/home'])
      },
       error => {
         showMessage('error identifying:')
       }
     );

    }
  }

  getPasswordData(): PasswordResetModel{
    let model = new PasswordResetModel();
      model.email = this.fgv.email.value;
      model.type = '2';
      return model;
  }

  get fgv(){
    return this.fgValidator.controls;
  }



}
