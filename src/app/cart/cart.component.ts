import { ProductsEffect } from './../store/effects';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RequestsService } from '../shared/requests.service';
import { Product } from '../shared/product.module';
import { Store } from '@ngrx/store';
import * as ProductsActions from '../store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{
  products!: Product[];
  produc: Product = {
    id: 1,
    name: 'NEW',
    rate: 8,
    price: 900,
    unit: 1
  };
  totalPrice: number = 0;
  units: number = 0;
  cartStatus!: boolean;
  cart = "CART";
  subscription!: Subscription;
  constructor(
    private requestsService: RequestsService,
    private store: Store<any>,
    private productsEffect: ProductsEffect
    ) {}
  ngOnInit() {
    this.requestsService.totalPrice$.subscribe(
      data => {
        this.totalPrice = data;
      }
    )
    this.store.select("cartReducer")
    this.subscription = this.store.subscribe(
      data => {
        this.products = data.cartReducer.products;
        if (this.products !== null) {this.getTotalPrice(this.products)}
        // this.getTotalPrice(this.products);

        console.log(data.cartReducer.products);
      }
    )

    // this.productsEffect.productsEffect$.subscribe(
    //   data => {
    //     console.log("From Cart Effect: ");
    //     console.log(data);
    //   }
    // )
    this.requestsService.isCartOpen$.subscribe(
      status => {
        this.cartStatus = status;
        console.log(this.cartStatus);
      }
    )
  }

  removeDuplicates(array: Product[]): Product[] {
    const uniqueArray = array.filter((product, index, self) => {
      // Check for duplicates based on "id"
      const isFirstOccurrenceIndex = self.findIndex((p) => p.id === product.id);
      const isFirstOccurrence = index === isFirstOccurrenceIndex;
      // If it's not the first occurrence, self[Index].unit += 1;
      if (!isFirstOccurrence) {
        self[isFirstOccurrenceIndex].unit += 1;
        console.log("removed!", product);
      }
      // If it's the first occurrence, include in the new array
      return isFirstOccurrence;
    });
    return uniqueArray;
  }
  cartOpen() {
    this.cartStatus = true;
  }
  cartClose() {
    this.cartStatus = false;
  }
  onDeleteProduct(event: Event, product: Product) {
    const productEl = (event.target as HTMLElement).closest('.product');
    console.log(product);
    // productEl?.remove()
    // this.requestsService.removeItem(this.cart, product.id)
    this.store.dispatch(new ProductsActions.removeAction([this.cart, product.id]))
    this.totalPrice -= product.price * product.unit;
  }
  getTotalPrice(products: Product[]) {
    this.totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      this.totalPrice += products[i].price * products[i].unit;
    }
  }
  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
  }
}

