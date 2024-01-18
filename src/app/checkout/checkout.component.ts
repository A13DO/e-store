import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../shared/product.module';
import * as ProductsActions from '../store/actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products!: Product[];
  cart = "CART";
  totalPrice!: number;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select("cartReducer")
    this.store.subscribe(
      data => {
        this.products = data.cartReducer.products
        console.log(this.products);
        if (this.products !== null) {this.getTotalPrice(this.products)}

        // this.getTotalPrice(this.products)
      }
    )
  }
  getTotalPrice(products: Product[]) {
    this.totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      this.totalPrice += products[i].price * products[i].unit;
    }
  }
  onDeleteProduct(product: Product) {
    this.store.dispatch(new ProductsActions.removeAction([this.cart, product.id]))
    this.totalPrice -= product.price * product.unit;
  }
}
