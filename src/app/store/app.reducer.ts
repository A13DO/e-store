import * as fromWishlist from "../wishlist/store/wishlist.store"
import * as fromCart from "../store/store"
import { ActionReducerMap } from "@ngrx/store";


export interface AppState {
  wishlistReducer: fromWishlist.productsState;
  cartReducer: fromCart.productsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  wishlistReducer: fromWishlist.wishlistReducer,
  cartReducer: fromCart.counterReducer
}
