import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandModel } from 'src/app/models/parameters/brand.model';
import { CategoryModel } from 'src/app/models/parameters/category.model';
import { ProductModel } from 'src/app/models/products/product.model';
import { BrandService } from 'src/app/services/parameters/brand.service';
import { CategoryService } from 'src/app/services/parameters/category.service';
import { ProductService } from 'src/app/services/products/product.service';

declare const showMessage: any;
declare const initSelect:any;

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  fgValidator!: FormGroup;
  categoryList!: CategoryModel[];
  brandList!: BrandModel[];

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private router:Router,
    private brandService: BrandService,
    private categoryService: CategoryService
     ) { }

  ngOnInit(): void {
    this.fillSelects();
    this.FormBuilder();

  }
  /**
   * fill all select in form
   */

  fillSelects(){
    this.brandService.getAllRecords().subscribe(
    data=>{
        this.brandList = data;
        console.log(this.brandList)
        initSelect();

    },
    error=>{
      console.log('Error loading brands');
    });
    this.categoryService.getAllRecords().subscribe(
      data=>{
          this.categoryList = data;
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
      description: ['',[Validators.required]],
     // categoryId: ['',[Validators.required]],
      brandId: ['',[Validators.required]],
      model: ['',[Validators.minLength(3), Validators.maxLength(30)]],
      price: ['',[Validators.required ]],
      cost: ['',[Validators.required]],
      stock: ['',[Validators.required]],
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
        this.router.navigate(['/products/product-list'])
      },
       error => {
         showMessage('error saving.:')
       }
     );

    }
  }

 getStoreData(): ProductModel{
    let model = new ProductModel();
     model.categoryId='1';// this.fgv.categoryId.value;
     model.brandId = this.fgv.brandId.value;
     model.name = this.fgv.name.value;
     model.model= this.fgv.model.value;
     model.description= this.fgv.description.value;
     model.photo = this.fgv.photo.value;
     model.price= this.fgv.price.value;
     model.cost= this.fgv.cost.value;
     model.stock = this.fgv.stock.value;
    return model;
  }

  get fgv(){
    return this.fgValidator.controls;
  }

}
