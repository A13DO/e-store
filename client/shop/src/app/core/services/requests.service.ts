import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../shared/product.model';
import { Comment } from '../interfaces/comment.model';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  of,
  tap,
} from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Change import statement
import { map, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'global/base/base.component';

@Injectable({
  providedIn: 'root',
})
// this.favoritesUrl = `https://movies-guide-eb5a7-default-rtdb.firebaseio.com/${this.uid}/favorites.json`;
// this.cartUrl = `https://movies-guide-eb5a7-default-rtdb.firebaseio.com/${this.uid}/cart.json`;
// this.wishlistUrl = `https://movies-guide-eb5a7-default-rtdb.firebaseio.com/${this.uid}/wishlist.json`;
export class RequestsService extends BaseComponent {
  private isCartToggleSubject = new Subject<boolean>();
  private isCartOpenSubject = new BehaviorSubject<boolean>(false);
  private totalPriceSubject = new BehaviorSubject<number>(0);
  private cartLengthSubject = new BehaviorSubject<number>(0);
  private wishlistLengthSubject = new BehaviorSubject<number>(0);

  cartLength$ = this.cartLengthSubject.asObservable();
  wishlistLength$ = this.wishlistLengthSubject.asObservable();

  itemsNumbers$ = combineLatest([this.cartLength$, this.wishlistLength$]);
  isCartOpen$ = this.isCartOpenSubject;
  totalPrice$ = this.totalPriceSubject;
  isCartToggle$ = this.isCartToggleSubject;
  wishlist = 'WICHLIST';
  cart = 'CART';
  products: Product[] = [];
  dbWishlist: Product[] = [];
  dbCart: Product[] = [];
  wishlistLen!: number;
  uid: string | undefined;
  // cartUrl = `https://movies-guide-eb5a7-default-rtdb.firebaseio.com/${this.uid}/cart.json`;
  // wishlistUrl = `https://movies-guide-eb5a7-default-rtdb.firebaseio.com/${this.uid}/wishlist.json`;
  constructor(private http: HttpClient) {
    super();
    // Safe JSON parsing with error handling
    const jsonString = localStorage.getItem('userData');
    if (jsonString) {
      try {
        const parsedData = JSON.parse(jsonString);
        this.uid = parsedData.uid;
      } catch (error) {
        console.error('Error parsing userData from localStorage:', error);
      }
    }
    this.getWishlist()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        data == null ? (this.dbWishlist = []) : (this.dbWishlist = data);
        this.wishlistLengthSubject.next(this.dbWishlist.length);
      });
    this.getCart()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        data == null ? (this.dbCart = []) : (this.dbCart = data);
        console.log('from SERVICE>', this.dbCart);
        // this.cartLengthSubject.next(this.dbCart.length)
        this.cartLengthSubject.next(data.length);
      });
  }

  // // getCart
  //   getDbCart() {
  //     let products!: Product[];
  //     this.getCart().pipe(takeUntil(this.destroy$)).subscribe(
  //       data => {
  //         data == null? this.dbCart = [] : this.dbCart = data;
  //         console.log("from SERVICE>", this.dbCart);
  //         this.cartLengthSubject.next(this.dbCart.length)
  //       }
  //       )
  //       return this.dbCart;
  //   }

  // Modify the return type to Observable<Product[]>
  getDbCart(): Observable<Product[]> {
    return this.getCart().pipe(
      tap((data) => {
        // Update this.dbCart when data is emitted
        data ?? [];
        console.log('from SERVICE>', data);
        this.cartLengthSubject.next(data.length);
      })
    );
  }

  getAll(
    search?: string,
    category?: string,
    sortOption?: string,
    numericFilter?: string,
    limit?: number
  ) {
    let apiUrl: string = `https://e-commerce-api-wvh5.onrender.com/api/v1/products`;
    // ?numericFilter=150,670
    let sign = '?';
    if (search) {
      apiUrl = apiUrl + `${sign}search=${search}`;
      sign = '&';
      console.log(apiUrl);
    }
    if (category) {
      apiUrl = apiUrl + `${sign}category=${category}`;
      sign = '&';
      console.log(apiUrl);
    }
    if (sortOption) {
      apiUrl = apiUrl + `${sign}sort=${sortOption}`;
      sign = '&';
      console.log(apiUrl);
    }
    if (numericFilter) {
      apiUrl = apiUrl + `${sign}numericFilter=${numericFilter}`;
      sign = '&';
      console.log(apiUrl);
    }
    if (limit) {
      apiUrl = apiUrl + `${sign}limit=${limit}`;
      console.log(apiUrl);
    }
    return this.http.get<{ success: boolean; data: Product[] }>(apiUrl).pipe(
      map((res) => {
        const products: Product[] = res.data.map((product) => {
          return { ...product, unit: 1 };
        });
        return products;
      })
    );
  }

  getProduct(productId: number) {
    return this.http.get(
      `https://e-commerce-api-wvh5.onrender.com/api/v1/products/${productId}`
    );
  }
  updateProducts(products: Product[]) {
    return this.http.put<any>(
      `https://e-commerce-86f86-default-rtdb.firebaseio.com/${this.uid}/cart.json`,
      products
    );
  }
  getAllCategories() {
    return this.http
      .get<{ success: boolean; data: Product[] }>(
        `https://e-commerce-api-wvh5.onrender.com/api/v1/categories`
      )
      .pipe(map((res) => res.data));
  }

  addNewCategory(category: string) {
    return this.http.post<any>(
      `https://e-commerce-api-wvh5.onrender.com/api/v1/categories`,
      {
        category: category,
      }
    );
  }

  getCategory(category: string, sortOption?: string, numericFilter?: string) {
    // ?numericFilter=150,670
    let apiUrl: string = `https://e-commerce-api-wvh5.onrender.com/api/v1/products?category=${category}`;
    if (sortOption) {
      apiUrl = apiUrl + `&sort=${sortOption}`;
      console.log(apiUrl);
    }
    if (numericFilter) {
      apiUrl = apiUrl + `&numericFilter=${numericFilter}`;
      console.log(apiUrl);
    }
    return this.http
      .get<{ success: boolean; data: Product[] }>(apiUrl)
      .pipe(map((res) => res.data));
  }

  createOrder(body: any) {
    this.http
      .post<any>('https://e-commerce-api-wvh5.onrender.com/api/v1/orders', body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addToWishlist(product: Product) {
    this.dbWishlist = removeDuplicates(this.dbWishlist, product);
    this.wishlistLengthSubject.next(this.dbWishlist.length);
    return this.http.put<Product[]>(
      `https://e-commerce-86f86-default-rtdb.firebaseio.com/${this.uid}/wishlist.json`,
      this.dbWishlist
    );
  }
  getWishlist() {
    return this.http.get<Product[]>(
      `https://e-commerce-86f86-default-rtdb.firebaseio.com/${this.uid}/wishlist.json`
    );
  }
  addToCart(product: Product) {
    let list!: Product[];
    this.dbCart = removeDuplicates(this.dbCart, product);
    // this.dbCart.push(product)
    console.log('AFTER REMOVE D: ', this.dbCart);
    this.cartLengthSubject.next(this.dbCart.length);

    return this.http.put<Product[]>(
      `https://e-commerce-86f86-default-rtdb.firebaseio.com/${this.uid}/cart.json`,
      this.dbCart
    );
  }
  // ${this.uid}/
  getCart() {
    return this.http.get<Product[]>(
      `https://e-commerce-86f86-default-rtdb.firebaseio.com/${this.uid}/cart.json`
    );
  }
  draft: any = [];
  // ========================== Test ===============================
  removeCartItem(id: number) {
    this.draft.push(id);
    let listName = 'cart';
    if (this.dbCart) {
      for (let removeId of this.draft) {
        this.dbCart = this.dbCart.filter((p: Product) => p._id !== removeId);
      }
      this.cartLengthSubject.next(this.dbCart.length);
    }
    return this.http.put<Product[]>(
      `https://e-commerce-86f86-default-rtdb.firebaseio.com/${this.uid}/${listName}.json`,
      this.dbCart
    );
  }
  removeWishItem(id: number) {
    this.draft.push(id);
    let listName = 'wishlist';
    if (this.dbWishlist) {
      for (let removeId of this.draft) {
        this.dbWishlist = this.dbWishlist.filter(
          (p: Product) => p._id !== removeId
        );
      }
      this.wishlistLengthSubject.next(this.dbWishlist.length);
    }
    return this.http.put<Product[]>(
      `https://e-commerce-86f86-default-rtdb.firebaseio.com/${this.uid}/${listName}.json`,
      this.dbWishlist
    );
  }
  getComments(productID: any) {
    return this.http.get<any>(
      `https://e-commerce-api-wvh5.onrender.com/api/v1/comments/${productID}`
    );
  }
  getOneComment(productID: any, uid: any) {
    return this.http.get<any>(
      `https://e-commerce-api-wvh5.onrender.com/api/v1/comments/${productID}/${uid}`
    );
  }
  saveComment(productID: string, body: any): Observable<any> {
    console.log(productID, body);
    localStorage.setItem('commentExists', 'true');
    return this.http.post<any>(
      `https://e-commerce-api-wvh5.onrender.com/api/v1/comments/${productID}`,
      body
    );
  }

  updateComment(productID: any, uid: any, body: any) {
    console.log(body);

    return this.http.put<any>(
      `https://e-commerce-api-wvh5.onrender.com/api/v1/comments/${productID}/${uid}`,
      body
    );
  }

  // saveComment(id: number,uid: any , comment: string) {
  //   let comments: Comment;
  //   comments = {username: "Abdo",  comment: comment, rating: 4};
  //   console.log(uid);
  //   return this.http.put<Comment>(`https://e-commerce-86f86-default-rtdb.firebaseio.com/comments/${id}/${uid}.json`,
  //   comments)
  // }
  // getComments(id: number) {
  //   return this.http.get<any>(`https://e-commerce-86f86-default-rtdb.firebaseio.com/comments/${id}.json`)
  // }
  // ========================== Test ===============================
  //   removeItem(componentName: string, id: number) {
  //     this.draft.push(id)
  //     let list!: Product[];
  //     let subject;
  //     let listName;
  //     console.log("First", this.dbCart);
  //     if (componentName === this.cart) {
  //       this.getDbCart().pipe(takeUntil(this.destroy$)).subscribe(
  //         products => {
  //           this.dbCart = products;
  //           list = this.dbCart;
  //           console.log(list);
  //         }
  //       )
  //       listName = "cart";
  //       subject = this.cartLengthSubject;
  //     } else if (componentName === this.wishlist) {
  //       listName = "wichlist";
  //       list = this.dbWishlist;
  //       subject = this.wishlistLengthSubject;
  //     }
  //     // list == this.dbWishlist? list : "Cart";
  //     if (this.dbCart) {
  //       console.log(listName);
  //       console.log(this.dbCart);
  //       console.log("ASDSAD");
  //       for (let removeId of this.draft) {
  //         list = list.filter((p: Product) => p.id !== removeId);
  //       }
  //       subject?.next(list.length)
  //     }
  //     // componentName === this.cart? this.dbCart = list : this.dbWishlist = list;
  //     console.log(listName);
  //     console.log(list);
  //     return this.http.put<Product[]>(`https://e-commerce-86f86-default-rtdb.firebaseio.com/${listName}.json`,
  //     list)
  //   }
}
// In your cart service or utils file:
export function removeDuplicates(
  array: Product[],
  product: Product
): Product[] {
  const index = array.findIndex((p) => p._id === product._id);

  if (index !== -1) {
    // If product exists, increment unit but ensure it doesn't drop below 1
    const modifiedProduct: Product = {
      ...array[index],
      unit: (array[index].unit || 1) + 1,
    };
    array[index] = modifiedProduct;
    return [...array];
  }

  // If new product, add with unit 1
  return [...array, { ...product, unit: 1 }];
}

// If it's not the first occurrence, self[Index].unit += 1;
// if (!isFirstOccurrence) {
//   console.log("from units: ", self[isFirstOccurrenceIndex].unit);
//   self[isFirstOccurrenceIndex].unit += 1;
//   console.log("removed!", product);
// }
// // If it's the first occurrence, include in the new array
// return isFirstOccurrence;
