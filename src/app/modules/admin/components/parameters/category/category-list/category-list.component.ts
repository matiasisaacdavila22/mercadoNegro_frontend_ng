import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryModel } from 'src/app/models/parameters/category.model';
import { CategoryService } from 'src/app/core/services/parameters/category.service';

declare const closeModal: any;
declare const showMessage: any;
declare const showRemoveConfirmationWindows: any;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  page:number = 1;
  recordList!: CategoryModel[];
  idRemove: String = '';

  constructor(
    private service: CategoryService,
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
        showMessage("there os an error with backend communication.")
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
        showMessage('Removed Category succesfully')
       },
      error => {
        showMessage("there os an error with backend communication.")
      }
    );
  }
  }
}
