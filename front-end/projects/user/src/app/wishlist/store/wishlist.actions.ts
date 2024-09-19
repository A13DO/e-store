import { Product } from "../../shared/product.model";
import { Action } from "@ngrx/store";


export const INITIALIZEWISHLIST  = "initialize-wishlist";
export const ADD_TO_WISHLIST = "add-to-wishlist";
export const DELETEWISHLISTITEM = "delete-wishlist-item";
export const WISHLISTSUCCESS  = "wishlist-success";
export const WISHLISTFAIL  = "wishlist-fail";

export class initializeWishlistAction implements Action {
  readonly type: string = INITIALIZEWISHLIST;
  payload: Product[]
  constructor(payload: Product[]) {
    this.payload = payload;
  }
}

export class addToWishlistAction implements Action {
  readonly type: string = ADD_TO_WISHLIST;
  payload: Product
  constructor(payload: Product) {
    this.payload = payload;
  }
}
export class deleteWishlistItemAction implements Action {
  readonly type = DELETEWISHLISTITEM;
  payload: any
  constructor(payload: any) {
    this.payload = payload;
  }
}
export class WishlistSuccessAction implements Action {
  readonly type: string = WISHLISTSUCCESS;
  payload: any
  constructor(payload: any) {
    this.payload = payload;
  }
}
export class WishlistFailAction implements Action {
  readonly type: string = WISHLISTFAIL;
  constructor( error: any) {
    error = error
  }
}

export type WishlistActions =
initializeWishlistAction
| addToWishlistAction
| deleteWishlistItemAction
| WishlistSuccessAction
| WishlistFailAction





