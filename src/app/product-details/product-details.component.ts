import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  statusCartText = "Add to cart"

  cartStatus: boolean = false;
  saveStatus: boolean = false;
  // statusCartText = "Added to cart"
  onAddToCart() {
    this.cartStatus? this.cartStatus = false : this.cartStatus = true;
  }
  onSave() {
    this.saveStatus? this.saveStatus = false : this.saveStatus = true;
  }
}
