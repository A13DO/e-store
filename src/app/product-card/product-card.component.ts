import { Component, Input } from '@angular/core';
import { RequestsService } from '../shared/requests.service';
import { Product } from '../shared/product.module';
import { Store } from '@ngrx/store';
import * as ProductsActions from '../store/actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  constructor(private requestsService: RequestsService, private store: Store) {

  }
  @Input() cardProduct!: Product;
  onAddToWishlist() {
    this.requestsService.addToWishlist(this.cardProduct)
  }
  onAddToCart() {
    this.store.dispatch(new ProductsActions.addToCartAction(this.cardProduct))

    // this.requestsService.addToCart(this.cardProduct) ======= return
  }
}
