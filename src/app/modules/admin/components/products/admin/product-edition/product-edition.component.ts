import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandModel } from 'src/app/models/parameters/brand.model';
import { CategoryModel } from 'src/app/models/parameters/category.model';
import { ProductModel } from 'src/app/models/products/product.model';
import { BrandService } from 'src/app/core/services/parameters/brand.service';
import { CategoryService } from 'src/app/core/services/parameters/category.service';
import { ProductService } from 'src/app/core/services/products/product.service';

declare const showMessage: any;
declare const initSelect:any;

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css']
})
export class ProductEditionComponent implements OnInit {

  fgValidator!: FormGroup;
  categoryList!: CategoryModel[];
  brandList!: BrandModel[];
  id!:String;

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private router:Router,
    private route: ActivatedRoute,
    private brandService: BrandService,
    private categoryService: CategoryService
     ) { this.id = this.route.snapshot.params["id"];}

  ngOnInit(): void {
    this.FormBuilder();
    this.getdataOfRecord();
    this.getAllCategories();
    this.getAllBrands();


  }
  /**
   * fill all select in form
   */

   getAllBrands(){
    this.brandService.getAllRecords().subscribe(
    data=>{
        this.brandList = data;
        console.log(this.brandList)
        initSelect();

    },
    error=>{
      console.log('Error loading brands');
    });
  }

  getAllCategories(){
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

  EditRecordFn(){
    if(this.fgValidator.invalid){
      showMessage('Invalid form');
    }else{
      let model = this.getStoreData();
     this.service.editRecord(model).subscribe(
       data => {
        showMessage('Update Product succesfully')
        this.router.navigate(['/products/product-list'])
      },
       error => {
         showMessage('error edit.')
       }
     );

    }
  }

  FormBuilder(){
    this.fgValidator = this.fb.group({
      id: ['',[Validators.required]],
      name: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(100)]],
      description: ['',[Validators.required]],
      categoryId: ['',[Validators.required]],
      brandId: ['',[Validators.required]],
      model: ['',[Validators.minLength(3), Validators.maxLength(100)]],
      price: ['',[Validators.required ]],
      cost: ['',[Validators.required]],
      stock: ['',[Validators.required]],
      photo: ['',[Validators.maxLength(100)]],
    })
  }

  getdataOfRecord() {
    if(this.id){
      this.service.getRecordById(this.id).subscribe(
        data => {
            this.fgv.id.setValue(data.id);
            this.fgv.name.setValue(data.name);
            this.fgv.model.setValue(data.model);
            this.fgv.categoryId.setValue(data.categoryId);;
            this.fgv.brandId.setValue(data.brandId);
            this.fgv.description.setValue(data.description);
            this.fgv.photo.setValue(data.photo);
            this.fgv.price.setValue(data.price);
            this.fgv.cost.setValue(data.cost);
            this.fgv.stock.setValue(data.stock);
        },
        error => {
          showMessage('register Product not found')
          this.router.navigate(["/products/product-list"]);
        }
      );
    }else{
      this.router.navigate(["/products/product-list"]);
    }
  }


 getStoreData(): ProductModel{
    let model = new ProductModel();
     model.id = this.fgv.id.value;
     model.categoryId= this.fgv.categoryId.value;
     model.brandId = this.fgv.brandId.value;
     model.name = this.fgv.name.value;
     model.model= this.fgv.model.value;
     model.description= this.fgv.description.value;
     model.photo = this.fgv.photo.value;
     model.price=parseFloat(this.fgv.price.value);
     model.cost= parseFloat(this.fgv.cost.value);
     model.stock = parseInt(this.fgv.stock.value);
    return model;
  }

  get fgv(){
    return this.fgValidator.controls;
  }

}

