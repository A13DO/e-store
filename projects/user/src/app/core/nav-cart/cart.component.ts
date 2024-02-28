import { ProductsEffect } from '../../store/effects';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { RequestsService } from '../../shared/requests.service';
import { Product } from '../../shared/product.module';
import { Store, select } from '@ngrx/store';
import * as ProductsActions from '../../store/actions';
import { Observable, Subscription, tap } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { selectCartProducts } from '../../store/selectors';
import { AppState } from '../../store/app.reducer';
import { productsState } from '../../store/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{
  products!: Product[];
  totalPrice: number = 0;
  units: number = 0;
  cartStatus!: boolean;
  cart = "CART";
  storeSub!: Subscription;
  ProductsObrsv$!: Observable<Product[]>;
  constructor(
    private requestsService: RequestsService,
    private store: Store<AppState>,
    private sanitizer: DomSanitizer
    ) {
      this.ProductsObrsv$ = this.store.pipe(select(selectCartProducts))
      this.storeSub = this.ProductsObrsv$.subscribe((cartProducts: Product[]) => {
        this.products = cartProducts;
        if (this.products !== null) {
          // Loop over the cart products array
          this.getTotalPrice(this.products)
        }
      });
    }
    state: Observable<productsState> | undefined;
  ngOnInit() {
    this.requestsService.totalPrice$.subscribe(
      data => {
        this.totalPrice = data;
      }
    )
    // this.subscription =
    // this.state?.subscribe(
    //   data => {
    //     console.log(data.products);
    //   }
    // )


    // this.store.subscribe(
    //   (data: AppState) => {
    //     this.products = data.cartReducer.products;
    //     if (this.products !== null) {this.getTotalPrice(this.products)}
    //     // this.getTotalPrice(this.products);

    //     console.log(data.cartReducer);
    //   }
    // )

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

  toSafeUrl(url: any) {
    url = url.replace(/["\[\]]/g, '');
    let safeUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return safeUrl;
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
    this.storeSub.unsubscribe();
  }
}

