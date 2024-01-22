import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../shared/product.module';
import * as ProductsActions from '../store/actions';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
[x: string]: any;
  products!: Product[];
  one = 1;
  two = 2;
  three = 3;
  four = 4;
  five = 5;
  selected: number = 0;
  cart = "CART";
  totalPrice!: number;
value: any;
  constructor(private store: Store<any>) {{}}
  ngOnInit(): void {
    this.store.select("cartReducer")
    this.store.subscribe(
      data => {
        this.products = data.cartReducer.products
        console.log(this.products);
        if (this.products !== null) {this.getTotalPrice(this.products)}
      }
    )
  }
  onQuantityChange(selectedValue: number, product: Product) {
    console.log(selectedValue);
    product = {...product, unit: selectedValue};
    this.products = [...this.products, {...product}]
    console.log(this.products);
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
