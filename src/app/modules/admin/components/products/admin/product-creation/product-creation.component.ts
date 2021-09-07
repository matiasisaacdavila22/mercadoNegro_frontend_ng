import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandModel } from 'src/app/models/parameters/brand.model';
import { CategoryModel } from 'src/app/models/parameters/category.model';
import { ProductModel } from 'src/app/models/products/product.model';
import { BrandService } from 'src/app/core/services/parameters/brand.service';
import { CategoryService } from 'src/app/core/services/parameters/category.service';
import { ProductService } from 'src/app/core/services/products/product.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';


declare const showMessage: any;
declare const initSelect:any;



@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent implements OnInit {

  fgValidator!: FormGroup;
  categoryselect!:CategoryModel;
  categoryList!: CategoryModel[];
  brandList!: BrandModel[];
  image$!:Observable<any>;
  file!:string;
  name!:string;

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private router:Router,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private afStorage:AngularFireStorage

     ) { }

  ngOnInit(): void {
    this.FormBuilder();
    this.fillSelectsCategories();
    this.fillSelectsBrands();


  }
  /**
   * fill all select in form
   */

  fillSelectsBrands(){
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

  fillSelectsCategories(){
    this.categoryService.getAllRecords().subscribe(
      data => {
          this.categoryList = data;
          console.log(this.categoryList)
          initSelect();
      },
      error => {
        console.log('Error loading categories');
      });
  }

  FormBuilder(){
    this.fgValidator = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(100)]],
      description: ['',[Validators.required]],
      categoryId: ['',[Validators.required]],
      brandId: ['',[Validators.required]],
      model: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(100)]],
      price: ['',[Validators.required ]],
      cost: ['',[Validators.required]],
      stock: ['',[Validators.required]],
      photo: ['',[Validators.required]]
    })
  }

  uploadFile(event:any) {
    this.file = event.target.files[0];
    this.name =   `${Date.now()}.product`;

  }

  saveFile(){
    if(this.fgValidator.invalid){
      console.log(this.fgv.name.errors)
     // showMessage('Invalid form');
    }else{
    const fileRef = this.afStorage.ref(this.name);
    const task = this.afStorage.upload(this.name, this.file);
    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
       this.image$.subscribe(url => {
          console.log(url);
            this.fgv.photo.setValue(url);
            this.SaveNewRecordFn();

      });
      })
    )
    .subscribe(
      data => {
        this.router.navigate(['admin/products/product-list']);
      },
      error => {
        console.log(error)
      }
    );
  }
  }





 SaveNewRecordFn(){
    if(this.fgValidator.invalid){
      console.log(this.fgv.name.errors)
     // showMessage('Invalid form');
    }else{
      let model = this.getStoreData();
      //console.log(model);
     this.service.saveNewRecord(model).subscribe(
       data => {
       // showMessage('register Category succesfully')
       // this.router.navigate(['/products/product-list'])
      // this.saveFile();

      },
       error => {
         showMessage('error saving.:')
       }
     );

    }
  }


 getStoreData(): ProductModel{
    let model = new ProductModel();
     model.categoryId= this.fgv.categoryId.value;
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
