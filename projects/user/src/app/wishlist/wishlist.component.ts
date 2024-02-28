import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestsService } from '../shared/requests.service';
import { Product } from '../shared/product.module';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectWishlistProducts } from '../store/selectors';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  products!: Product[];
  totalPrice: number = 0;
  units: number = 0;
  wishlistProducts$: any;
  constructor(private requestsService: RequestsService, private store: Store<any>) {
    this.wishlistProducts$ = this.store.pipe(select(selectWishlistProducts));
  }
  sub!: Subscription;

  ngOnInit() {
    // this.store.select('wishlistReducer')
    // this.store.subscribe(data => {
    //   // Handle the selected state here
    //   this.products = data.wishlistReducer.products;
    //   console.log(this.products);
    // });

  }
  ngOnDestroy(): void {
    // this.sub.unsubscribe()
  }
}
