import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../shared/product.module';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products!: Product[];
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select("productsReducer")
    this.store.subscribe(
      data => {
        this.products = data.productsReducer.products
        // this.getTotalPrice(this.products)
        console.log(this.products);
      }
    )
  }
}
