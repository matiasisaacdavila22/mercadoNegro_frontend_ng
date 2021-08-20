import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandModel } from 'src/app/models/parameters/brand.model';
import { BrandService } from 'src/app/services/parameters/brand.service';

declare const showMessage: any;

@Component({
  selector: 'app-brand-edition',
  templateUrl: './brand-edition.component.html',
  styleUrls: ['./brand-edition.component.css']
})
export class BrandEditionComponent implements OnInit {

  fgValidator!: FormGroup;
  id!:String;
  photo: String = '';
  oldPhoto: String = '';

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
            this.photo = data.photo;
            this.fgv.oldPhoto.setValue(data.photo);
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
      name: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(80)]],
      photo: ['',[Validators.maxLength(50)]],
      oldPhoto: ['',[Validators.maxLength(50)]]
    })
  }

 EditRecordFn(){
  if(this.fgValidator.invalid){
    showMessage('Invalid Form');
  }else{
  const formData = new FormData();
  formData.append('id', this.fgv.id.value);
  formData.append('name', this.fgv.name.value);
  formData.append('file', this.fgv.photo.value);
  formData.append('oldPhoto', this.fgv.oldPhoto.value);
     this.service.editRecord(formData).subscribe(
       data => {
        showMessage('Update brand succesfully')
        this.getdataOfRecord();
       // this.router.navigate(['/parameters/brand-list'])
      },
       error => {
         showMessage('error saving.:')
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
      model.id = this.fgv.id.value;
      model.name = this.fgv.name.value;
      model.photo = this.fgv.photo.value;
      model.oldPhoto = this.fgv.oldPhoto.value;
      return model;
  }

  get fgv(){
    return this.fgValidator.controls;
  }

}

