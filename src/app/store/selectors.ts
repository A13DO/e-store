
import { createSelector } from '@ngrx/store';
import * as fromWishlist from "../wishlist/store/wishlist.store";
import * as fromCart from "../store/store";

export interface AppState {
  wishlist: fromWishlist.wishlistProductsState;
  cart: fromCart.productsState;
}

export const selectWishlistState = (state: AppState) => state.wishlist;
export const selectCartState = (state: AppState) => state.cart;

export const selectWishlistProducts = createSelector(
  selectWishlistState,
  (wishlistState: fromWishlist.wishlistProductsState) => wishlistState.products
);

export const selectCartProducts = createSelector(
  selectCartState,
  (cartState: fromCart.productsState) => cartState.products
);
