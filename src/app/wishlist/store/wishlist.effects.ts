import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, catchError, of } from "rxjs";
import { RequestsService } from "src/app/shared/requests.service";
import * as ProductsActions from '../../store/actions';






@Injectable()
export class wishlistEffect {

  constructor(private http: HttpClient, private actions$: Actions, private requestsService: RequestsService, private store: Store) {}
  wishlistEffect$ = createEffect(() =>

    this.actions$.pipe(
      ofType(ProductsActions.ADD_TO_WISHLIST),
      switchMap((action) =>
        // send the new product (in service there fetched data update it then send)
        this.requestsService.addToWishlist((action as ProductsActions.addToWishlistAction).payload)
        .pipe(
          map((data) => new ProductsActions.CartSuccessAction(data)),
          catchError((err) => of(new ProductsActions.CartFailAction("err")))
        )
      )
    )
  );

  // wishlistEffect$ = createEffect(() =>
  // this.actions$.pipe(
  //   ofType(ProductsActions.ADD_TO_WISHLIST),
  //   switchMap((action) =>
  //     // send the new product (in service there fetched data update it then send)
  //     this.requestsService.addToWishlist((action as ProductsActions.addToWishlistAction).payload)
  //     .pipe(
  //       map((data) => new ProductsActions.CartSuccessAction(data)),
  //       catchError((err) => of(new ProductsActions.CartFailAction("err")))
  //     )
  //   )
  // )
  // );
}













