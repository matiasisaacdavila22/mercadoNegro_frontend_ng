import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreModel } from 'src/app/models/store/store.model';
import { StoreService } from 'src/app/core/services/store/store.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {

    storeId!: String;
    storeDetail!: StoreModel;

  constructor(private route: ActivatedRoute, private service: StoreService) {
    this.storeId = this.route.snapshot.params["id"];
   }

  ngOnInit(): void {
    this.getDataOfStore();
  }

  getDataOfStore(){
    this.service.getRecordById(this.storeId).subscribe(
      data => {
          this.storeDetail = data;
          console.log(this.storeDetail.photo)
      },
      error => {

      }
    )
  }

}
