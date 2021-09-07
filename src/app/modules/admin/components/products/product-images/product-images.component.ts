import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductImageModel } from 'src/app/models/products/product-image.model copy';
import { ProductImagesService } from 'src/app/core/services/products/product-images.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';


declare const closeModal: any;
declare const showMessage: any;
declare const showRemoveConfirmationWindows: any;

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.css']
})
export class ProductImagesComponent implements OnInit {

  fgValidator!: FormGroup;
  productId!: String;
  imagesList!: ProductImageModel[];
  idRemove: String = '';

  image$!:Observable<any>;
  file!:string;
  name!:string;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ProductImagesService,
    private afStorage:AngularFireStorage,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.FormBuilder();
    this.productId = this.route.snapshot.params['id'];
    this.fgv.productId.setValue(this.productId);
    this.getAllImagesByProsuctId();
  }

  getAllImagesByProsuctId(){
    this.service.getRecordsByProductId(this.productId).subscribe(
      data =>{
      this.imagesList = data;
      },
      err => {
        showMessage('Error loading current images of product');
      }
    );
  }

  FormBuilder(){
    this.fgValidator = this.fb.group({
      name: ['',[Validators.required]],
      orden: ['',[Validators.required]],
      productId: ['',[Validators.required]],
    })
  }

  UploadImageFn(){
    if(this.fgValidator.invalid){
      console.log(this.fgv.name.errors)
      console.log('error en la validacion')
   //   showMessage('Invalid Form');
    }else{
    const formData = new FormData();
    formData.append('file', this.fgv.name.value);
    formData.append('orden', this.fgv.orden.value);
    formData.append('productId', this.fgv.productId.value);

    const fileRef = this.afStorage.ref(this.name);
    const task = this.afStorage.upload(this.name, this.file);
    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
       this.image$.subscribe(url => {
          console.log(url);
            this.fgv.name.setValue(url);
            formData.set('file', this.fgv.name.value);
             this.service.UploadProductImage(formData).subscribe(
              data => {
                //  this.fgv.name.setValue(data.filename);
                //  showMessage('The image was upload successfuly');
                //  this.getAllImagesByProsuctId();
              },
              error => {
                showMessage('Error uploadImage');
              }
            );

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




  onFileSelect(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.fgv.name.setValue(file);
    }
  }

  uploadFile(event:any) {
    this.file = event.target.files[0];
    this.name =   `${Date.now()}.product`;

  }

  get fgv(){
    return this.fgValidator.controls;
  }

  RemoveConfirmation(id:String){
    this.idRemove = id;
    showRemoveConfirmationWindows();
  }

  RemoveRecord(){
    closeModal('removeConfirmationModal')
    if(this.idRemove){
    this.service.deleteRecord(this.idRemove).subscribe(
      data => {
        this.idRemove = '';
        this.getAllImagesByProsuctId();
        showMessage('Removed product succesfully')
       },
      error => {
        showMessage("there os an error with backend communication.")
      }
    );
  }
  }

}
