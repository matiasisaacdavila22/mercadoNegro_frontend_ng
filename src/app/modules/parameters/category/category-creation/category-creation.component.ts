import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/parameters/category.model';
import { CategoryService } from 'src/app/core/services/parameters/category.service';

declare const showMessage: any;

@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.css']
})
export class CategoryCreationComponent implements OnInit {

  fgValidator!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private router:Router,
      ) { }

  ngOnInit(): void {
    this.FormBuilder();
  }

  FormBuilder(){
    this.fgValidator = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(30)]],
      photo: ['',[Validators.maxLength(80)]]
    })
  }

 SaveNewRecordFn(){
    if(this.fgValidator.invalid){
      showMessage('Invalid form');
    }else{
      const formData = new FormData();
      formData.append('name', this.fgv.name.value);
      formData.append('file', this.fgv.photo.value);
      this.service.saveNewRecord(formData).subscribe(
       data => {
        showMessage('register Category succesfully')
        this.router.navigate(['/parameters/category-list'])
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

 getStoreData(): CategoryModel{
    let model = new CategoryModel();
      model.name = this.fgv.name.value;
      model.photo = this.fgv.photo.value;
      return model;
  }

  get fgv(){
    return this.fgValidator.controls;
  }

}
