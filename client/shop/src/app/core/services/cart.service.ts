import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../../shared/product.model';
import { removeDuplicates } from './requests.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private isCartOpenSubject = new BehaviorSubject<boolean>(false);
  private totalPriceSubject = new BehaviorSubject<number>(0);
  private cartLengthSubject = new BehaviorSubject<number>(0);
  private isCartToggleSubject = new Subject<boolean>();

  isCartToggle$ = this.isCartToggleSubject;

  cartLength$ = this.cartLengthSubject;
  isCartOpen$ = this.isCartOpenSubject;
  totalPrice$ = this.totalPriceSubject;

  private dbCart: Product[] = [];
  private uid: string | undefined;

  constructor(private http: HttpClient) {
    this.initializeUid();
    this.loadCart();
  }

  private initializeUid() {
    const jsonString = localStorage.getItem('userData');
    if (jsonString) {
      try {
        const parsedData = JSON.parse(jsonString);
        this.uid = parsedData.uid;
      } catch (error) {
        console.error('Error parsing userData:', error);
      }
    }
  }

  private loadCart() {
    this.getCart().subscribe((data) => {
      this.dbCart = data ?? [];
      this.cartLengthSubject.next(this.dbCart.length);
    });
  }

  addToCart(product: Product) {
    this.dbCart = removeDuplicates(this.dbCart, product);
    this.cartLengthSubject.next(this.dbCart.length);
    return this.updateCart();
  }

  removeCartItem(id: string) {
    // Changed type from number to string
    this.dbCart = this.dbCart.filter((p) => p._id !== id);
    this.cartLengthSubject.next(this.dbCart.length);
    return this.updateCart();
  }

  private updateCart() {
    return this.http.put<Product[]>(
      `https://e-commerce-86f86-default-rtdb.firebaseio.com/${this.uid}/cart.json`,
      this.dbCart
    );
  }

  getCart(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `https://e-commerce-86f86-default-rtdb.firebaseio.com/${this.uid}/cart.json`
    );
  }

  // Other cart-related methods...
}
