import * as fromWishlist from "../wishlist/store/wishlist.store"
import * as fromCart from "../store/store"
import { ActionReducerMap } from "@ngrx/store";


export interface AppState {
  wishlist: fromWishlist.wishlistProductsState;
  cart: fromCart.productsState;
}


export const appReducers: ActionReducerMap<AppState> = {
  wishlist: fromWishlist.wishlistReducer, // Use correct reducer name
  cart: fromCart.cartReducer, // Use correct reducer name
}

// export interface AppState {
//   wishlist: fromWishlist.productsState; // Use consistent naming
//   cart: fromCart.productsState; // Use consistent naming
// }

