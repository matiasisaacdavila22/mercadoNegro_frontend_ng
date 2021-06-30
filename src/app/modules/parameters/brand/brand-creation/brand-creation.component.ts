import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandModel } from 'src/app/models/parameters/brand.model';
import { BrandService } from 'src/app/services/parameters/brand.service';

declare const showMessage: any;

@Component({
  selector: 'app-brand-creation',
  templateUrl: './brand-creation.component.html',
  styleUrls: ['./brand-creation.component.css']
})
export class BrandCreationComponent implements OnInit {

  fgValidator!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: BrandService,
    private router:Router
     ) { }

  ngOnInit(): void {
    this.FormBuilder();
  }

  FormBuilder(){
    this.fgValidator = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(30)]],
      photo: ['',[Validators.maxLength(50)]],
    })
  }

 SaveNewRecordFn(){
    if(this.fgValidator.invalid){
      showMessage('Invalid form');
    }else{
      let model = this.getStoreData();
      console.log(model);
     this.service.saveNewRecord(model).subscribe(
       data => {
        showMessage('register brand succesfully')
        this.router.navigate(['/parameters/brand-list'])
      },
       error => {
         showMessage('error saving.:')
       }
     );

    }
  }

 getStoreData(): BrandModel{
    let model = new BrandModel();
      model.name = this.fgv.name.value;
      model.photo = this.fgv.photo.value;
      return model;
  }

  get fgv(){
    return this.fgValidator.controls;
  }

}

