import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../shared/product.module';
import * as ProductsActions from '../store/actions';
import { Observable, Subscription, tap } from 'rxjs';
import { selectCartProducts } from '../store/selectors';
import { select } from '@ngrx/store';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  products!: Product[];
  cart = "CART";
  totalPrice!: number;
  storeSub!: Subscription;
  ProductsObrsv$!: Observable<Product[]>;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.ProductsObrsv$ = this.store.pipe(select(selectCartProducts))
    this.storeSub = this.ProductsObrsv$.subscribe((cartProducts: Product[]) => {
      this.products = cartProducts;
      if (this.products !== null) {
        // Loop over the cart products array
        this.getTotalPrice(this.products)
      }
    });
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
  ngOnDestroy() {
    this.storeSub.unsubscribe()
  }
}
