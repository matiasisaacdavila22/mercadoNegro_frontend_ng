import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandModel } from 'src/app/models/parameters/brand.model';
import { CategoryModel } from 'src/app/models/parameters/category.model';
import { BrandService } from 'src/app/services/parameters/brand.service';
import { CategoryService } from 'src/app/services/parameters/category.service';

declare const showMessage: any;
declare const initSelect: any;

@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.css']
})
export class CategoryCreationComponent implements OnInit {

  fgValidator!: FormGroup;
  categoryList!: CategoryModel[];
  brandList!: BrandModel[];

  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private router:Router,
    private categoryService: CategoryService,
    private brandService: BrandService
     ) { }

  ngOnInit(): void {
    this.FormBuilder();
    this.fillSelectsCategories();
    this.fillSelectsBrands();
    initSelect();
  }

  fillSelectsCategories(){
    this.categoryService.getAllRecords().subscribe(
      data=>{
          this.categoryList = data;
          console.log(this.categoryList)
          initSelect();
      },
      error=>{
        console.log('Error loading categories');
      });
  }
  fillSelectsBrands(){
    this.brandService.getAllRecords().subscribe(
      data=>{
          this.brandList = data;
          console.log(this.brandList)
          initSelect();
      },
      error=>{
        console.log('Error loading categories');
      });
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
        showMessage('register Category succesfully')
        this.router.navigate(['/parameters/category-list'])
      },
       error => {
         showMessage('error saving.:')
       }
     );

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
