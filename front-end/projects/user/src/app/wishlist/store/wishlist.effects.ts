import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, map, catchError, of } from "rxjs";
import { RequestsService } from "../../core/services/requests.service";
import * as WishlistActions from './wishlist.actions';






@Injectable()
export class wishlistEffect {
  constructor(private http: HttpClient, private actions$: Actions, private requestsService: RequestsService, private store: Store) {}
  wishlistEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.ADD_TO_WISHLIST),
      switchMap((action) =>
        // send the new product (in service there fetched data update it then send)
        this.requestsService.addToWishlist((action as WishlistActions.addToWishlistAction).payload)
        .pipe(
          map((data) => new WishlistActions.WishlistSuccessAction(data)),
          catchError((err) => of(new WishlistActions.WishlistFailAction(err)))
        )
      )
    )
  );
  deleteWishlsitItemEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.DELETEWISHLISTITEM),
      switchMap((action) =>
        this.requestsService.removeWishItem((action as WishlistActions.deleteWishlistItemAction).payload[1])
        .pipe(
          map((data) => new WishlistActions.WishlistSuccessAction(data)),
          catchError((err) => of(new WishlistActions.WishlistFailAction("err")))
        )
      )
    )
  );
}













