
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Store } from '@ngrx/store';
import { Injectable } from "@angular/core";
import { switchMap, map, catchError, of } from "rxjs";
import * as authActions from '../store/auth.actions';

@Injectable()
export class ProductsEffect {
  // private selectProductsState = (state: productsState) => state.products;

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<any>) {
      // this.store.pipe(select(selectCartProducts)).subscribe((cartProducts: Product[]) => {
      //   this.products = cartProducts;
      //   console.log(this.products);
      // })
    }
// switchMap operator to handle the asynchronous operation and dispatch new actions based on the outcome.
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.SIGNIN),
      switchMap((action) =>
        // send the new product (in service there fetched data update it then send)
        this.authService.signIn((action as authActions.signIn).payload[0],(action as authActions.signIn).payload[1])
        .pipe(
          map(user => new authActions.authSuccess({ user })),
          catchError(error => of(new authActions.authFailed({ error })))
        )
      )
    )
  );
}
