import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '@models/products/product.model';
import { CartService } from '@core/services/cart/cart.service';


@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  products$!: Observable<ProductModel[]>;

  constructor(
    private cartService: CartService
  ) {
    this.products$ = this.cartService.cart$;
  }

  ngOnInit(): void {
  }

}
