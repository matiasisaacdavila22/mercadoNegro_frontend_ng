import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MD5 } from 'crypto-js';
import { StoreModel } from 'src/app/models/store/store.model';
import { SecurityService } from 'src/app/core/services/security/security.service';


declare const showMessage: any;
declare const initSidenav: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      })
  }

 LoginStoreFn(){
    if(this.fgValidator.invalid){
      showMessage('Invalid form');
    }else{
      let model = this.getLoginData();
     this.service.StoreLogin(model).subscribe(
       data => {
         this.service.saveSessionData(data);
        showMessage('Welcome to yout account')
        this.router.navigate(['/products/product-list'])
      },
       error => {
         showMessage('error identifying:')
       }
     );

    }
  }

  getLoginData(): StoreModel{
    let model = new StoreModel();
      model.email = this.fgv.email.value;
      model.password = MD5(this.fgv.password.value).toString();
      return model;
  }

  get fgv(){
    return this.fgValidator.controls;
  }

}
