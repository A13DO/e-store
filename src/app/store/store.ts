import { Action, ActionReducerMap } from "@ngrx/store";
import { Product } from "../shared/product.module";
import * as ProductsActions from "./actions";
import { removeDuplicates } from "../shared/requests.service";

const INCREMENT = "increment";


export interface AppState {
  productsReducer: productsState;
}
export interface productsState {
  products: Product[];
  error: string;
}

export const initialState: productsState = {
  products: [],
  error: ""
}
export const appReducers: ActionReducerMap<AppState> = {
  productsReducer: counterReducer,
}

// ==================== Products =================


// Reducer

// I see that you have a Redux reducer named counterReducer that handles various actions, including INITIALIZESTATE, ADD_TO_CART, and CARTSUCCESS. In the INITIALIZESTATE case, you are trying to call the removeDuplicates function on the initProducts array, but you are not assigning the result back to anything.

// Here's a modified version of your code:

// typescript
// Copy code
export function counterReducer(store = initialState, action: ProductsActions.ProductsActions): productsState {
  switch (action.type) {
    case ProductsActions.INITIALIZESTATE:
      let initProducts = (action as ProductsActions.initializeStateAction).payload;
      console.log(typeof store.products);
      initProducts = initProducts == null? store.products : initProducts;
      // initProducts = removeDuplicates(initProducts);
      console.log("Store: ", initProducts);
      // ==================== return fetched state =================
      return { ...store, products: [...store.products, ...initProducts] };
    case ProductsActions.ADD_TO_CART:
      const newProducts = (action as ProductsActions.addToCartAction).payload;
      return { ...store, products: [...store.products, newProducts] };
    case ProductsActions.ADD_TO_WISHLIST:
      const newWishProducts = (action as ProductsActions.addToWishlistAction).payload;
      return { ...store, products: [...store.products, newWishProducts] };
    // Delete,
    case ProductsActions.CARTSUCCESS:
      return { ...store, products: (action as ProductsActions.CartSuccessAction).payload };
    default:
      return store;
  }
}

// Action Class : to avoid using {type: "increment", paylaod: 2} when dispatch
// export class addToCartAction implements Action {
//   type: string = "add-to-cart";
//   payload: Product;

//   constructor(payload: Product) {
//     this.payload = payload;
//   }
// }

// export class decrementAction implements Action {
//   type: string = "decrement";
//   payload: number;

//   constructor(payload: number) {
//     this.payload = payload;
//   }
// }



