import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreModel } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';

declare const showMessage: any;

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  storeList!: StoreModel[];
  storeSelect: String = '';
  isLogged: Boolean = false;
  subscription!: Subscription;

  constructor(private service: StoreService,private serviceSecurity: SecurityService, private router:Router,) { }

  ngOnInit(): void {
    this.isLogin();
    this.getAllStore();

  }
  isLogin(){
    this.subscription = this.serviceSecurity.getStoreData().subscribe(data => {
      this.isLogged = data.isLoggend;
    });
  }

  getAllStore(){
    this.service.getAllRecords().subscribe(
      data => {
        this.storeList = data;
        console.log(data)
      },
      error => {
        showMessage('error edit.')
      }
    )
  }
  selectedStore(id:any){
    this.router.navigate([`/store/store-details/${id}`]);
  }

}
