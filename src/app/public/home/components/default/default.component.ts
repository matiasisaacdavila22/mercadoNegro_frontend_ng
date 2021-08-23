import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/core/services/store/store.service';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/core/services/security/security.service';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit, AfterViewInit {

  mySwiper!:Swiper;

  isLogged: Boolean = false;
  subscription!: Subscription;

  constructor(private service: StoreService,private serviceSecurity: SecurityService, private router:Router) { }

  ngOnInit(): void {
   // this.isLogin();
  }

/*isLogin(){
    this.subscription = this.serviceSecurity.getStoreData().subscribe(data => {
      this.isLogged = data.isLoggend;
      if(this.isLogged){
        this.router.navigate([`/product/product-list`]);
      }else{
        this.router.navigate([`/store/store-list`]);
      }
    });
  }*/

  ngAfterViewInit(){
    this.mySwiper = new Swiper('.swiper-container');
  }

}
