import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreModel } from 'src/app/models/store/store.model';
import { StoreService } from 'src/app/core/services/store/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  storeId!: any;
  storeDetail!: StoreModel;

constructor(private route: ActivatedRoute, private service: StoreService, private router:Router) {
 // this.storeId = this.route.snapshot.params["id"];
 }

ngOnInit(): void {
  this.getStorage();
}

getStorage(){
 let session = localStorage.getItem('session');
  if(session){
    let jsonSession = JSON.parse(session);

  this.storeId = jsonSession.id;
  this.getDataOfStore();
}
}

getDataOfStore(){
  console.log('llegue getdatastore   ******')
  this.service.getRecordById(this.storeId).subscribe(
    data => {
        this.storeDetail = data;
        console.log(this.storeDetail.photo)
    },
    error => {

    }
  )
}

selectedStore(id:any){
  this.router.navigate([`/store/store-details/${id}`]);
}

}
