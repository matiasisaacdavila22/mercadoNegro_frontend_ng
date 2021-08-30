import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/models/products/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: ProductModel[] = [];
  private cart = new BehaviorSubject<ProductModel[]>([]);

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(product: ProductModel) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }
}
