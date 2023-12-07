import { product } from './../store/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.module';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  // dbCart: product[] = [];
  // product: Product = {
  //   id: 1,
  //   name: "NIKE",
  //   rate: 6,
  //   price: 212,
  //   unit: 1
  // };
  products: Product[] = [];
  dbWishlist: Product[] = [];
  dbCart: Product[] = [];
  constructor(private http: HttpClient) {
    this.getWishlist().subscribe(
      data => {
        data == null? this.dbWishlist = [] : this.dbWishlist = data;

        // this.dbWishlist = data;
      }
    )
    this.getCart().subscribe(
      data => {
        data == null? this.dbCart = [] : this.dbCart = data;
      }
    )
  }

  addToWishlist(product: Product) {
    this.dbWishlist.push(product)
    this.http.put<Product[]>("https://e-commerce-86f86-default-rtdb.firebaseio.com/wishlist.json",
    this.dbWishlist
  ).subscribe()
  }
  getWishlist() {
    return this.http.get<Product[]>("https://e-commerce-86f86-default-rtdb.firebaseio.com/wishlist.json");
  }
  addToCart(product: Product) {
    this.dbCart.push(product)

    // this.dbCart.push({"product1": "ADIDAS"})
    this.http.put<Product[]>("https://e-commerce-86f86-default-rtdb.firebaseio.com/cart.json",
    this.dbCart
  ).subscribe()
  }
  getCart() {
    return this.http.get<Product[]>("https://e-commerce-86f86-default-rtdb.firebaseio.com/cart.json");
  }
  removeItem() {

  }
}
