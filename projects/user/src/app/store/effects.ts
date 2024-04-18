import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import * as ProductsActions from './actions';
import { Product } from '../shared/product.module';
import { RequestsService } from '../shared/requests.service';
import { Store, select } from '@ngrx/store';
import { AppState, productsState } from './store';
import { selectCartProducts } from './selectors';

@Injectable()
export class ProductsEffect {
  private selectProductsState = (state: productsState) => state.products;
  products!: Product[]

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private requestsService: RequestsService,
    private store: Store<any>) {
      // this.store.pipe(select(selectCartProducts)).subscribe((cartProducts: Product[]) => {
      //   this.products = cartProducts;
      //   console.log(this.products);
      // })
    }
// switchMap operator to handle the asynchronous operation and dispatch new actions based on the outcome.
  productsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.ADD_TO_CART),

      // withLatestFrom(this.store.pipe(select(selectCartProducts))),
      // switchMap((action) => {
      //   return this.requestsService.addToCart((action as ProductsActions.addToCartAction).payload)
      // })
      switchMap((action) =>
        // send the new product (in service there fetched data update it then send)
        this.requestsService.addToCart((action as ProductsActions.addToCartAction).payload)
        .pipe(
          map((data) => new ProductsActions.CartSuccessAction(data)),
          catchError((err) => of(new ProductsActions.CartFailAction("err")))
        )
      )
    )
    // , {dispatch: false}
  );

  updateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.UPDATE_PRODUCTS),
      switchMap((action) => {
        return this.requestsService.updateProducts((action as ProductsActions.updateProducts).payload)
      })
      // switchMap((action) =>
      //   // send the new product (in service there fetched data update it then send)
      //   this.requestsService.updateProducts((action as ProductsActions.updateProducts).payload)
      //   .pipe(
      //     map((data) => new ProductsActions.CartSuccessAction(data)),
      //     catchError((err) => of(new ProductsActions.CartFailAction("err")))
      //   )
      // )
    )
  );
  deleteEffect$ = createEffect(() =>
  // this.store.pipe(select(selectCartProducts)).subscribe((cartProducts: Product[]) => {
  //   this.products = cartProducts;
  // )
    this.actions$.pipe(
      ofType(ProductsActions.REMOVE),
      // withLatestFrom(this.products), // Replace 'yourReducerState' with your actual reducer state key
      switchMap((action) =>
        this.requestsService.removeCartItem((action as ProductsActions.removeAction).payload[1])
        // this.requestsService.updateProducts(this.products)
        .pipe(
          map((data) => new ProductsActions.CartSuccessAction(data)),
          catchError((err) => of(new ProductsActions.CartFailAction("err")))
        )
      )
    )
  );
}

// this.http.put<Product[]>("https://e-commerce-86f86-default-rtdb.firebaseio.com/cart.json",
// list).subscribe(
//   res => {
//     console.log(res);
//   }
// )
// subject?.next(list.length)
// }
  // Assuming you have a selector to get the current state
  // private selectProductsState = (state: AppState) => state.products;

  // productsEffect$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ProductsActions.ADD_TO_CART),
  //     withLatestFrom(this.store.select(this.selectProductsState)),
  //     switchMap(([action, state]) => {
  //       // Assuming `addToCart` in your service requires both action payload and the current state
  //       return this.requestsService.addToCart(action.payload, state).pipe(
  //         map((data) => new ProductsActions.CartSuccessAction(data)),
  //         catchError((err) => of(new ProductsActions.CartFailAction(err)))
  //       );
  //     })
  //   )
  // );
