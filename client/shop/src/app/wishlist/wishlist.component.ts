import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectWishlistProducts } from '../store/selectors';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  products!: Product[];
  totalPrice: number = 0;
  units: number = 0;
  wishlistProducts$: any;
  constructor(private store: Store<any>) {
    this.wishlistProducts$ = this.store.pipe(select(selectWishlistProducts));
  }
  sub!: Subscription;

  ngOnInit() {
    // this.store.select('wishlistReducer')
    // this.store.pipe(takeUntil(this.destroy$)).subscribe(data => {
    //   // Handle the selected state here
    //   this.products = data.wishlistReducer.products;
    //   console.log(this.products);
    // });
  }
  ngOnDestroy(): void {
    // this.sub.unsubscribe()
  }
}
