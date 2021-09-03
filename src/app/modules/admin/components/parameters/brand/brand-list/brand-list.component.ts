import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandModel } from 'src/app/models/parameters/brand.model';
import { BrandService } from 'src/app/core/services/parameters/brand.service';

declare const closeModal: any;
declare const showMessage: any;
declare const showRemoveConfirmationWindows: any;

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})


export class BrandListComponent implements OnInit {
  page:number = 1;
  recordList!: BrandModel[];
  idRemove: String = '';

  constructor(
    private service: BrandService,
    private router: Router

    ) { }

  ngOnInit(): void {

      this.fillRecords();

  }

  fillRecords(){
    this.service.getAllRecords().subscribe(
      data => {
        this.recordList = data;
        console.log(this.recordList)
      },
      error => {
        showMessage("error with backend communication.")
      }
    );
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
        this.fillRecords();
        showMessage('Removed brand succesfully')
       },
      error => {
        showMessage(" error with backend communication.")
      }
    );
  }
  }
}
