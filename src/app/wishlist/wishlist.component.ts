import { Component } from '@angular/core';
import { RequestsService } from '../shared/requests.service';
import { Product } from '../shared/product.module';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  products!: Product[];
  totalPrice: number = 0;
  units: number = 0;
  constructor(private requestsService: RequestsService) {}
  ngOnInit() {
    this.requestsService.getWishlist().subscribe(
      resData => {
        this.products = resData;
        this.products == null? this.products = [] : this.products;
      }
    )
  }
}
