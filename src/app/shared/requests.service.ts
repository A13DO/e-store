import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.module';
import { BehaviorSubject, combineLatest } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private isCartOpenSubject = new BehaviorSubject<boolean>(false);
  private cartLengthSubject = new BehaviorSubject<number>(0);
  private wishlistLengthSubject = new BehaviorSubject<number>(0);

  cartLength$ = this.cartLengthSubject.asObservable();
  wishlistLength$ = this.wishlistLengthSubject.asObservable();

  itemsNumbers$ = combineLatest([this.cartLength$, this.wishlistLength$]);
  isCartOpen$ = this.isCartOpenSubject;
  wichlist = "WICHLIST";
  cart = "CART";
  products: Product[] = [];
  dbWishlist: Product[] = [];
  dbCart: Product[] = [];
  wishlistLen!: number;
  constructor(private http: HttpClient) {
    this.getWishlist().subscribe(
      data => {
        data == null? this.dbWishlist = [] : this.dbWishlist = data;
        this.wishlistLengthSubject.next(this.dbWishlist.length)
      }
    )
    this.getCart().subscribe(
      data => {
        data == null? this.dbCart = [] : this.dbCart = data;
        this.cartLengthSubject.next(this.dbCart.length)
      }
    )
  }

  addToWishlist(product: Product) {
    this.dbWishlist.push(product)
    this.dbWishlist = removeDuplicates(this.dbWishlist, product);
    this.http.put<Product[]>("https://e-commerce-86f86-default-rtdb.firebaseio.com/wishlist.json",
    this.dbWishlist
  ).subscribe()
  this.wishlistLengthSubject.next(this.dbWishlist.length)
  }
  getWishlist() {
    return this.http.get<Product[]>("https://e-commerce-86f86-default-rtdb.firebaseio.com/wishlist.json");
  }
  addToCart(product: Product) {
    this.dbCart = removeDuplicates(this.dbCart, product);
    // this.dbCart.push(product)
  console.log("AFTER REMOVE D: ", this.dbCart);
    this.cartLengthSubject.next(this.dbCart.length)

    return this.http.put<Product[]>("https://e-commerce-86f86-default-rtdb.firebaseio.com/cart.json",
    this.dbCart)
  }
  getCart() {
    return this.http.get<Product[]>("https://e-commerce-86f86-default-rtdb.firebaseio.com/cart.json");
  }
  draft: any = [];
  removeItem(componentName: string, id: number) {
    this.draft.push(id)
    let list: Product[] = [];
    let subject;
    if (componentName === this.cart) {
      list = this.dbCart;
      subject = this.cartLengthSubject;
    } else if (componentName === this.wichlist) {
      list = this.dbWishlist;
      subject = this.wishlistLengthSubject;
    }
    for (let removeId of this.draft) {
      list = list.filter((p: Product) => p.id !== removeId);
    }
    console.log(list);
    this.http.put<Product[]>("https://e-commerce-86f86-default-rtdb.firebaseio.com/cart.json",
    list
    ).subscribe()
    subject?.next(list.length)
  }
}
export function removeDuplicates(array: Product[], product: Product): Product[] {
  console.log("=============================================");

  const index = array.findIndex((p) => p.id === product.id);

  if (index !== -1) {
    // If the object is found, create a modified object with the 'unit' property incremented
    const modifiedObject: Product = { ...array[index], unit: array[index].unit + 1 };

    // Update the array with the modified object
    array[index] = modifiedObject;

    // Return a new array with the modified object
    return [...array];
  }

  // If the object is not found, add it to the array
  return [...array, product];
}



    // If it's not the first occurrence, self[Index].unit += 1;
    // if (!isFirstOccurrence) {
    //   console.log("from units: ", self[isFirstOccurrenceIndex].unit);
    //   self[isFirstOccurrenceIndex].unit += 1;
    //   console.log("removed!", product);
    // }
    // // If it's the first occurrence, include in the new array
    // return isFirstOccurrence;
