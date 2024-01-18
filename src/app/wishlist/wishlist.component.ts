import { Component } from '@angular/core';
import { RequestsService } from '../shared/requests.service';
import { Product } from '../shared/product.module';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  products!: Product[];
  totalPrice: number = 0;
  units: number = 0;
  constructor(private requestsService: RequestsService, private store: Store<any>) {}
  ngOnInit() {
    // this.requestsService.getWishlist().subscribe(
    //   resData => {
    //     this.products = resData;
    //     this.products == null? this.products = [] : this.products;
    //   }
    // )
    // this.store.select("wishlistReducer")
    this.store.select('wishlistReducer').subscribe(data => {
      // Handle the selected state here
      this.products = data.products;
    });
    // this.store.subscribe(
    //   data => {
    //     this.products = data.wishlistReducer.products;
    //     console.log("data.wishlistReducer.products");
    //     this.products == null? this.products = [] : this.products;
    //   }
    // )
  }
}
