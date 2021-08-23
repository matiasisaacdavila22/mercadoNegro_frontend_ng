import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreModel } from 'src/app/models/store/userStore.model';
import { UserService } from 'src/app/core/services/user/user.service';
import {SecurityService} from 'src/app/core/services/security/security.service';


declare const closeModal: any;
declare const showMessage: any;
declare const showRemoveConfirmationWindows: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  page:number = 1;
  recordList!: UserStoreModel[];
  idRemove: string = '';
  icon: string = 'visibility';//_off';
  storeId!: any;

  constructor(
    private service: UserService,
    private router: Router,
    private securityService:SecurityService
  ) { }

  ngOnInit(): void {
    this.getStorage();
  }

  getStorage(){
      this.securityService.getStoreData().subscribe(
      data => {
              this.storeId = data.id;
              this.fillRecords();
      },
      error => {
        console.log(error);
    }
    );
  }


  fillRecords(){
    console.log(this.storeId);
    this.service.getAllRecords(this.storeId).subscribe(
      data => {
        this.recordList = data;
        console.log(this.recordList)
      },
      error => {
        showMessage("there os an error with backend communication.")
      }
    );
  }

  StopendConfirmation(id:string){

  }

  RemoveConfirmation(id:any){
    this.idRemove = id;
    showRemoveConfirmationWindows();
  }

  RemoveRecord(){
    closeModal('removeConfirmationModal')
    if(this.idRemove){
    this.service.deleteRecord(this.idRemove).subscribe(
      data => {
        this.idRemove = '';
        this.fillRecords();
        showMessage('Removed product succesfully')
       },
      error => {
        showMessage("there os an error with backend communication.")
      }
    );
  }
  }
}
