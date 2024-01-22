import { Component, Input, OnInit } from '@angular/core';
import { RequestsService } from '../shared/requests.service';
import { Product } from '../shared/product.module';
import { Store } from '@ngrx/store';
import * as ProductsActions from '../store/actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  value!: number;
  image!: any;
  constructor(private requestsService: RequestsService, private store: Store) {
  }
  ngOnInit(): void {
    this.cardProduct.unit = 1;
    console.log(typeof(this.cardProduct.price));
    this.image = this.cardProduct?.images?.[0]

    this.requestsService.isCartToggle$.subscribe(
      status => {
        this.cartToggle = status;
      }
    )
  }
  cartToggle: boolean = false;
  wishToggle!: boolean;
  @Input() cardProduct!: Product;
  @Input() wishlistButton: boolean = true;
  onAddToWishlist() {
    // this.store.select('wishlistReducer')
    this.store.dispatch(new ProductsActions.addToWishlistAction(this.cardProduct))
    // this.requestsService.totalPrice$.subscribe(
    // value => {
    //   this.value = value;
    // });
    // this.requestsService.totalPrice$.next(this.value + this.cardProduct.price)
    this.wishToggle? this.wishToggle = false : this.wishToggle = true;
  }
  onAddToCart() {
    if (this.cartToggle == false) {
      this.cartToggle = true;
      this.store.dispatch(new ProductsActions.addToCartAction(this.cardProduct))
    } else {
      this.store.dispatch(new ProductsActions.addToCartAction(this.cardProduct))
    }

  }
}
