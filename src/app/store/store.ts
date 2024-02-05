import { Product } from "../shared/product.module";
import * as ProductsActions from "./actions";

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

// ==================== Products =================


// Reducer

// I see that you have a Redux reducer named counterReducer that handles various actions, including INITIALIZESTATE, ADD_TO_CART, and CARTSUCCESS. In the INITIALIZESTATE case, you are trying to call the removeDuplicates function on the initProducts array, but you are not assigning the result back to anything.

// Here's a modified version of your code:

// typescript
// Copy code
export function counterReducer(store = initialState, action: ProductsActions.ProductsActions): productsState {
  switch (action.type) {
    // INITIALIZESTATE
    case ProductsActions.INITIALIZESTATE:
      let initProducts = (action as ProductsActions.initializeStateAction).payload;
      console.log(typeof store.products);
      initProducts = initProducts == null? store.products : initProducts;
      // initProducts = removeDuplicates(initProducts);
      console.log("Cart Store: ", initProducts);
      // ==================== return fetched state =================
      return { ...store, products: [...store.products, ...initProducts] };
    // ADD_TO_CART
    case ProductsActions.ADD_TO_CART:
      store.products === null ? store = initialState : store;
      console.log(store.products);
      const newProducts = (action as ProductsActions.addToCartAction).payload;
      return { ...store, products: [...store.products, newProducts] };
    // UPDATE
    case ProductsActions.UPDATE_PRODUCTS:
      const updateProducts = (action as ProductsActions.updateProducts).payload;

      return { ...store, products: updateProducts };
    // DELETE
    case ProductsActions.REMOVE:
      let removeId = (action as ProductsActions.removeAction).payload[1];
      let updatedProducts = [...store.products].filter((p: Product) => p.id !== removeId);
      // let updatedProducts = store.products.filter((p: Product) => p.id !== removeId);
      return { ...store, products: updatedProducts };
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



