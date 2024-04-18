
import { createSelector } from '@ngrx/store';
import * as fromWishlist from "../wishlist/store/wishlist.store";
import * as fromCart from "../store/store";
import * as fromAuth from "../core/auth/store/auth.store";

export interface AppState {
  wishlist: fromWishlist.wishlistProductsState;
  cart: fromCart.productsState;
  auth: fromAuth.AuthState;
}

export const selectWishlistState = (state: AppState) => state.wishlist;
export const selectCartState = (state: AppState) => state.cart;
export const selectAuthState = (state: AppState) => state.auth;

export const selectWishlistProducts = createSelector(
  selectWishlistState,
  (wishlistState: fromWishlist.wishlistProductsState) => wishlistState.products
);

export const selectCartProducts = createSelector(
  selectCartState,
  (cartState: fromCart.productsState) => cartState.products
);
export const selectAuth = createSelector(
  selectAuthState,
  (authState: fromAuth.AuthState) => authState
);
