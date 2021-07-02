import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandModel } from 'src/app/models/parameters/brand.model';
import { BrandService } from 'src/app/services/parameters/brand.service';

declare const showMessage: any;
declare const initSelect: any;
@Component({
  selector: 'app-brand-edition',
  templateUrl: './brand-edition.component.html',
  styleUrls: ['./brand-edition.component.css']
})
export class BrandEditionComponent implements OnInit {

  fgValidator!: FormGroup;
  id!:String;

  constructor(
    private fb: FormBuilder,
    private service: BrandService,
    private router:Router,
    private route: ActivatedRoute
     ) { this.id = this.route.snapshot.params["id"];}

  ngOnInit(): void {
    this.FormBuilder();
    this.getdataOfRecord();
  }
  getdataOfRecord() {
    if(this.id){
      this.service.getRecordById(this.id).subscribe(
        data => {
            this.fgv.id.setValue(data.id);
            this.fgv.name.setValue(data.name);
            this.fgv.photo.setValue(data.photo);
        },
        error => {
          showMessage('register brand not found')
          this.router.navigate(["/parameters/brand-list"]);
        }
      );
    }else{
      this.router.navigate(["/parameters/brand-list"]);
    }
  }

  FormBuilder(){
    this.fgValidator = this.fb.group({
      id: ['',[Validators.required]],
      name: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(30)]],
      photo: ['',[Validators.maxLength(50)]],
    })
  }

 EditRecordFn(){
    if(this.fgValidator.invalid){
      showMessage('Invalid form');
    }else{
      let model = this.getStoreData();
     this.service.editRecord(model).subscribe(
       data => {
        showMessage('Update brand succesfully')
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
      model.id = this.fgv.id.value;
      model.name = this.fgv.name.value;
      model.photo = this.fgv.photo.value;
      return model;
  }

  get fgv(){
    return this.fgValidator.controls;
  }

}

