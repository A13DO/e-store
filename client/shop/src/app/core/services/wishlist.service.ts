import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { Product } from '../../shared/product.model';
import { removeDuplicates } from './requests.service';
import { BaseComponent } from 'global/base/base.component';

@Injectable({ providedIn: 'root' })
export class WishlistService extends BaseComponent {
  private wishlistLengthSubject = new BehaviorSubject<number>(0);
  wishlistLength$ = this.wishlistLengthSubject.asObservable();

  private dbWishlist: Product[] = [];
  private uid: string | undefined;

  constructor(private http: HttpClient) {
    super();
    this.initializeUid();
    this.loadWishlist();
  }

  private initializeUid() {
    // Same uid initialization as CartService
  }

  private loadWishlist() {
    this.getWishlist()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.dbWishlist = data ?? [];
        this.wishlistLengthSubject.next(this.dbWishlist.length);
      });
  }

  addToWishlist(product: Product) {
    this.dbWishlist = removeDuplicates(this.dbWishlist, product);
    this.wishlistLengthSubject.next(this.dbWishlist.length);
    return this.updateWishlist();
  }

  removeWishlistItem(id: string) {
    this.dbWishlist = this.dbWishlist.filter((p) => p._id !== id);
    this.wishlistLengthSubject.next(this.dbWishlist.length);
    return this.updateWishlist();
  }

  private updateWishlist() {
    return this.http.put<Product[]>(
      `https://e-commerce-86f86-default-rtdb.firebaseio.com/${this.uid}/wishlist.json`,
      this.dbWishlist
    );
  }

  getWishlist(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `https://e-commerce-86f86-default-rtdb.firebaseio.com/${this.uid}/wishlist.json`
    );
  }
}
