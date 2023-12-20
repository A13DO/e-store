import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as ProductsActions from './actions';
import { Product } from '../shared/product.module';
import { RequestsService } from '../shared/requests.service';

@Injectable()
export class ProductsEffect {
  constructor(private http: HttpClient, private actions$: Actions, private requestsService: RequestsService) {}
// switchMap operator to handle the asynchronous operation and dispatch new actions based on the outcome.
  productsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.ADD_TO_CART),
      switchMap((action) =>
        // send the new product (in service there fetched data update it then send)
        this.requestsService.addToCart((action as ProductsActions.addToCartAction).payload)
        .pipe(
          map((data) => new ProductsActions.CartSuccessAction(data)),
          catchError((err) => of(new ProductsActions.CartFailAction("err")))
        )
      )
    )
  );
}


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
