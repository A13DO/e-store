import { product } from './../store/store';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RequestsService } from '../shared/requests.service';
import { Product } from '../shared/product.module';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges{
  products!: Product[];
  totalPrice: number = 0;
  units: number = 0;
  constructor(private requestsService: RequestsService) {}
  ngOnInit() {
    this.requestsService.getCart().subscribe(
      resData => {
        this.products = resData;
        this.products == null? this.products = [] : this.products;
        this.products = this.removeDuplicates(this.products)
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].unit > 1) {
            this.totalPrice += this.products[i].price * this.products[i].unit;
          } else {
            this.totalPrice += this.products[i].price;
          }
        }
      }
    )
  }
  ngOnChanges(changes: SimpleChanges) {
    // Called whenever an input property changes
    for (const propName in changes) {
      if (propName == "products") {
        console.log(changes[propName]);
        // if (changes[propName].currentValue == true) {
        // }
      }
    }
  }
  removeDuplicates(array: Product[]): Product[] {
    const uniqueArray = array.filter((product, index, self) => {
      // Check for duplicates based on "id"
      const isFirstOccurrenceIndex = self.findIndex((p) => p.id === product.id);
      const isFirstOccurrence = index === isFirstOccurrenceIndex;
      // If it's not the first occurrence, self[Index].unit += 1;
      if (!isFirstOccurrence) {
        self[isFirstOccurrenceIndex].unit += 1;
        console.log("removed!", product);
      }
      // If it's the first occurrence, include in the new array
      return isFirstOccurrence;
    });
    return uniqueArray;
  }
}

