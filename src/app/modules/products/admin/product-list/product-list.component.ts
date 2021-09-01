import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/products/product.model';
import { ProductService } from 'src/app/core/services/products/product.service';
import { CartService } from 'src/app/core/services/cart/cart.service'

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
    private router: Router,
    private cartService: CartService

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

  stopPrduct(id:String){
    this.service.editState(id,0).subscribe(
      data => {
        this.fillRecords();
      },
      error => {
        console.log('error')
      }
    );

  }

  activePrduct(id:String){
    this.service.editState(id,1).subscribe(
      data => {
        this.fillRecords();
      },
      error => {
        console.log('error')
      }
    );
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

  addCard(id:string){
    this.service.getRecordById(id).subscribe(
      data => {
        this.cartService.addCart(data);
      },
      error => {
        console.log(error);
      }
    )

  }
}
