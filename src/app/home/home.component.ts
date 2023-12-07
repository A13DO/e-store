import { product } from './../store/store';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface, counterReducer, decrementAction, incrementAction } from '../store/store';
import { Product } from '../shared/product.module';
import { RequestsService } from '../shared/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // dbCart: product[] = [];
  products: Product[] = [
    {
    id: 1,
    name: "NIKE",
    rate: 9,
    price: 200,
    unit: 1
    },
    {
    id: 2,
    name: "ADIDAS",
    rate: 8,
    price: 200,
    unit: 1
    },
    {
    id: 3,
    name: "YEEZY",
    rate: 8,
    price: 200,
    unit: 1
    },
    {
    id: 4,
    name: "FENDI",
    rate: 7,
    price: 200,
    unit: 1
    }
  ];
  count: any;
  constructor(private requestsService: RequestsService, private store: Store<StoreInterface>) {
  // this.requestsService.getWishlist().subscribe(
  //   data => {
  //     this.products = data;
  //     if (this.products == null) {
  //       this.products = []
  //     }
  //   }
  // )
  this.store.subscribe(data => {
    this.count = data.counter.n
  })
}
onAddToWishlist() {
  // this.requestsService.addToWishlist()
}
onAddToCart() {
  // this.requestsService.addToCart()
}
onIncrement() {
  this.store.dispatch(new incrementAction(5))

}
onDecrement() {
  this.store.dispatch(new decrementAction(5))
}
}

