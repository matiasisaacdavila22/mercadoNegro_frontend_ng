import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/products/product.model';
import { ProductService } from 'src/app/services/products/product.service';

declare const closeModal: any;
declare const showMessage: any;
declare const showRemoveConfirmationWindows: any;


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  page:number = 1;
  recordList!: ProductModel[];
  idRemove: String = '';
  icon: String = 'visibility';//_off';

  constructor(
    private service: ProductService,
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

  StopendConfirmation(id:String){

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
        showMessage('Removed product succesfully')
       },
      error => {
        showMessage("there os an error with backend communication.")
      }
    );
  }
  }
}
