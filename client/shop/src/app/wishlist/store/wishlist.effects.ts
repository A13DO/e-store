import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of } from 'rxjs';
import * as WishlistActions from './wishlist.actions';
import { WishlistService } from '../../core/services/wishlist.service';

@Injectable()
export class wishlistEffect {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private _WishlistService: WishlistService,
    private store: Store
  ) {}
  wishlistEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistActions.ADD_TO_WISHLIST),
      switchMap((action) =>
        // send the new product (in service there fetched data update it then send)
        this._WishlistService
          .addToWishlist(
            (action as WishlistActions.addToWishlistAction).payload
          )
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
        this._WishlistService
          .removeWishlistItem(
            (action as WishlistActions.deleteWishlistItemAction).payload[1]
          )
          .pipe(
            map((data) => new WishlistActions.WishlistSuccessAction(data)),
            catchError((err) =>
              of(new WishlistActions.WishlistFailAction('err'))
            )
          )
      )
    )
  );
}
