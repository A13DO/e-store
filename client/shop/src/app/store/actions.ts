import { Action } from "@ngrx/store";
import { Product } from "../shared/product.model";
import { Comment } from "../core/interfaces/comment.model";

export const ADD_TO_CART = "add-to-cart";
export const UPDATE_PRODUCTS = "update-products";
export const ADD_TO_WISHLIST = "add-to-wishlist";
export const DELETECARTITEM = "delete-cart-item";
export const CARTSUCCESS = "cart-success";
export const CARTFAIL = "cart-fail";
export const INITIALIZESTATE  = "initialize-state";
export const DELETEWISHLISTITEM = "delete-wishlist-item";
export const INITIALIZEWISHLIST  = "initialize-wishlist";
export const INITIALIZECOMMENTS  = "initialize-comments";
export const ADD_COMMENT  = "add-comment";
export const WISHLISTSUCCESS  = "wishlist-success";
export const WISHLISTFAIL  = "wishlist-fail";


export class initializeStateAction implements Action {
  readonly type: string = INITIALIZESTATE;
  payload: Product[]
  constructor(payload: Product[]) {
    this.payload = payload;
  }
}
export class initializeWishlistAction implements Action {
  readonly type: string = INITIALIZEWISHLIST;
  payload: Product[]
  constructor(payload: Product[]) {
    this.payload = payload;
  }
}
export class initializeCommentsAction implements Action {
  readonly type: string = INITIALIZECOMMENTS;
  payload: Comment[]
  constructor(payload: Comment[]) {
    this.payload = payload;
  }
}
export class addToCartAction implements Action {
  readonly type: string = ADD_TO_CART;
  payload: Product
  constructor(payload: Product) {
    this.payload = payload;
  }
}
export class updateProducts implements Action {
  readonly type: string = UPDATE_PRODUCTS;
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
export class deleteCartItemAction implements Action {
  readonly type = DELETECARTITEM;
  payload: any
  constructor(payload: any) {
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
export class CartSuccessAction implements Action {
  readonly type: string = CARTSUCCESS;
  constructor(public payload: any) {
  }
}
export class CartFailAction implements Action {
  readonly type: string = CARTFAIL;
  constructor( error: any) {
    error = error
  }
}

export class addCommentAction implements Action {
  readonly type: string = ADD_COMMENT;
  payload: Comment
  constructor(payload: Comment) {
    this.payload = payload;
  }
}

export type ProductsActions =
  initializeStateAction
  | addToCartAction
  | addToWishlistAction
  | deleteCartItemAction
  | CartSuccessAction
  | CartFailAction
  | addCommentAction
