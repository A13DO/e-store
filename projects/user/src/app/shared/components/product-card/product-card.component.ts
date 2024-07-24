import { Component, Input, OnInit } from '@angular/core';
import { RequestsService } from '../../../core/services/requests.service';
import { Product } from '../../product.model';
import { Store } from '@ngrx/store';
import * as ProductsActions from '../../../store/actions';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  value!: number;
  safeImageUrl: any;
  imageUrlOne: any;
  imageUrlTwo: any;
  imageUrlThree: any;
  constructor(private requestsService: RequestsService, private store: Store, private sanitizer: DomSanitizer) {
  }
  ngOnInit(): void {
    // this.cardProduct.unit = 1;
      this.imageUrlOne = this.cardProduct.images?.[0];
      this.imageUrlTwo = this.cardProduct.images?.[1];
      this.imageUrlThree = this.cardProduct.images?.[2];
      this.safeImageUrl =  this.toSafeUrl(this.imageUrlOne);
    this.requestsService.isCartToggle$.subscribe(
      status => {
        this.cartToggle = status;
      }
    )

  }
  toSafeUrl(url: any) {
    if (url === undefined) {
      return '';
    }
    url = url.replace(/["\[\]]/g, '');
    let safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return safeUrl;
  }

  cartToggle: boolean = false;
  wishToggle!: boolean;
  @Input() cardProduct!: any;
  @Input() wishlistButton: boolean = true;
  @Input() cartButton: boolean = true;
  onAddToWishlist() {

    if (this.wishToggle == false) {
      this.wishToggle = true;
      this.store.dispatch(new ProductsActions.addToWishlistAction(this.cardProduct))
    } else {
      this.store.dispatch(new ProductsActions.addToWishlistAction(this.cardProduct))
    }
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
