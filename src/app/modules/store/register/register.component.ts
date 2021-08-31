import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store/store.service';
import {StoreModel } from '../../../models/store/store.model';
import MD5 from 'crypto-js/md5';
import { AuthService} from 'src/app/core/services/auth/auth.service';


declare const showMessage: any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fgValidator!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: StoreService,
    private router:Router,
    private authService:AuthService,
     ) { }

  ngOnInit(): void {
    this.FormBuilder();
  }

  register(email:string, password:string){
         this.authService.createUser(email, password )
        .then(() => {
          this.router.navigate(['/security/login'])
        })
    }


  FormBuilder(){
    this.fgValidator = this.fb.group({
      firstName: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(30)]],
      lastName: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required,Validators.email, Validators.maxLength(30)]],
      phone: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(15)]],
      storeName: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(30)]],
      storeAddress: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(30)]],
      storeEmail: ['',[Validators.required,Validators.email, Validators.maxLength(30)]],
      storePhone: ['',[Validators.required,Validators.minLength(6), Validators.maxLength(30)]],
      password: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(30)]],
      password2: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(30)]],
    })
  }

 StoreRegisterFn(){
    if(this.fgValidator.invalid || this.fgv.password.value != this.fgv.password2.value){
        showMessage('Invalid form');
    }else{
      let model = this.getStoreData();
      console.log(model);
     this.service.StoreRegistering(model).subscribe(
       data => {
         console.log(data)
        //showMessage('register succesfully. you can find your password in your email inbox.')
        const value = this.fgValidator.value;
        this.register(value.email, value.password)
          console.log("registro exitoso")
          console.log(value)
      },
       error => {
         console.log(error.error.errors[0].msg)
         showMessage(`error :${error.error.errors[0].msg}`)
       }
     );

    }
  }

 getStoreData(): StoreModel{
    let model = new StoreModel();
      model.name = this.fgv.firstName.value;
      model.lastName = this.fgv.lastName.value;
      model.email = this.fgv.email.value;
      model.phone = this.fgv.phone.value;
      model.storeName = this.fgv.storeName.value;
      model.adress = this.fgv.storeAddress.value;
      model.storeEmail = this.fgv.storeEmail.value;
      model.storePhone = this.fgv.storePhone.value;
      model.password = MD5(this.fgv.password.value).toString();
      return model;
  }

  get fgv(){
    return this.fgValidator.controls;
  }

}
