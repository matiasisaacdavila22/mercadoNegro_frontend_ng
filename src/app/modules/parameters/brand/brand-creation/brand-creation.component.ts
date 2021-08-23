import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandModel } from 'src/app/models/parameters/brand.model';
import { BrandService } from 'src/app/core/services/parameters/brand.service';

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
      name: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(80)]],
      photo: ['',[Validators.maxLength(80)]]
      })
  }

  SaveNewRecordFn(){
    if(this.fgValidator.invalid){
      showMessage('Invalid Form');
    }else{
    const formData = new FormData();
    formData.append('name', this.fgv.name.value);
    formData.append('file', this.fgv.photo.value);
    this.service.saveNewRecord(formData).subscribe(
      data => {
          this.fgv.photo.setValue(data.filename);
          showMessage('The image was upload successfuly');
          this.router.navigate(['/parameters/brand-list'])
        },
      error => {
        console.log(error.error.errors[0].msg)
        showMessage(`error :${error.error.errors[0].msg}`)
      }
    );
  }
}

onFileSelect(event:any){
  if(event.target.files.length > 0){
    const file = event.target.files[0];
    this.fgv.photo.setValue(file);
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

