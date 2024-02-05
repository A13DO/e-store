import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestsService } from '../shared/requests.service';
import { Product } from '../shared/product.module';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {
  products!: Product[];
  totalPrice: number = 0;
  units: number = 0;
  constructor(private requestsService: RequestsService, private store: Store<any>) {}
  sub!: Subscription;

  ngOnInit() {
    this.store.select('wishlistReducer')
    this.store.subscribe(data => {
      // Handle the selected state here
      this.products = data.products;

    });

  }
  ngOnDestroy(): void {
    // this.sub.unsubscribe()
  }
}
