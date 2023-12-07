import { Component, Input } from '@angular/core';
import { RequestsService } from '../shared/requests.service';
import { Product } from '../shared/product.module';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  constructor(private requestsService: RequestsService) {

  }
  @Input() cardProduct!: any;
  onAddToWishlist() {
    this.requestsService.addToWishlist(this.cardProduct)
  }
  onAddToCart() {
    this.requestsService.addToCart(this.cardProduct)
  }
}
