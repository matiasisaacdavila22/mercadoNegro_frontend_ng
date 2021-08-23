import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreModel } from 'src/app/models/store/userStore.model';
import { UserService } from 'src/app/core/services/user/user.service';

declare const showMessage: any;

@Component({
  selector: 'app-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrls: ['./user-edition.component.css']
})
export class UserEditionComponent implements OnInit {

  fgValidator!: FormGroup;
  id!:string;
  photo: any = '';
  oldPhoto: string = '';

  constructor(
    private fb: FormBuilder,
    private service: UserService,
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
              this.fgv.email.setValue(data.email);
              this.fgv.password.setValue(data.password);
              this.fgv.role.setValue(data.role);
              this.fgv.description.setValue(data.description);
              this.fgv.condition.setValue(data.condition);
              this.photo = data.photo;
              this.fgv.oldPhoto.setValue(data.photo);
          },
       error => {
            showMessage('register User not found')
            this.router.navigate(["/security/user-list"]);
          }
        );
      }else{
        this.router.navigate(["/security/user-list"]);
      }
    }

    FormBuilder(){
      this.fgValidator = this.fb.group({
        id: ['',[Validators.required]],
        name: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(80)]],
        email: ['', [Validators.required,Validators.email, Validators.maxLength(30)]],
        password: ['',[Validators.required,Validators.minLength(7), Validators.maxLength(30)]],
        role: ['',[Validators.required,Validators.minLength(1), Validators.maxLength(30)]],
        condition: ['',[Validators.required,Validators.maxLength(1)]],
        description: ['',[Validators.required,Validators.maxLength(300)]],
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
    formData.append('email', this.fgv.email.value);
    formData.append('password', this.fgv.password.value);
    formData.append('role', this.fgv.role.value);
    formData.append('condition', this.fgv.condition.value);
    formData.append('description', this.fgv.description.value);
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

   getStoreData(): UserStoreModel{
      let model = new UserStoreModel();
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
