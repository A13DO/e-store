import { Component, Input, OnInit } from '@angular/core';
import { RequestsService } from '../../../core/services/requests.service';
import { Product } from '../../product.model';
import { Store } from '@ngrx/store';
import * as ProductsActions from '../../../store/actions';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  wishlist = "WISHLIST";

  value!: number;
  safeImageUrl: any;
  imageUrlOne: any;
  imageUrlTwo: any;
  imageUrlThree: any;
  user: any;
  constructor(private requestsService: RequestsService, private store: Store, private sanitizer: DomSanitizer, private router: Router) {
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
  @Input() deleteButton: boolean = false;
  @Input() cartButton: boolean = true;
  onAddToWishlist() {
    if (!this.isSignedIn()) {
      this.router.navigate(['/auth']);
    }
    if (this.wishToggle == false) {
      this.wishToggle = true;
      this.store.dispatch(new ProductsActions.addToWishlistAction(this.cardProduct))
    } else {
      this.store.dispatch(new ProductsActions.addToWishlistAction(this.cardProduct))
    }
  }
  onAddToCart() {
    if (!this.isSignedIn()) {
      this.router.navigate(['/auth']);
    }

    if (this.cartToggle == false) {
      this.cartToggle = true;
      this.store.dispatch(new ProductsActions.addToCartAction(this.cardProduct))
    } else {
      this.store.dispatch(new ProductsActions.addToCartAction(this.cardProduct))
    }
  }
  onDeleteFromWishlist() {
    this.store.dispatch(new ProductsActions.deleteWishlistItemAction([this.wishlist, this.cardProduct._id]))
  }
  isSignedIn() {
    let user = localStorage.getItem('userData');
    console.log(user);
    return user
  }
}
