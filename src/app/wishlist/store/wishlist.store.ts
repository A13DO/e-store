import { Product } from "src/app/shared/product.module";
import * as ProductsActions from "../../store/actions";





export interface productsState {
  products: Product[];
  error: string;
}

export const initialState: productsState = {
  products: [],
  error: ""
}


export function wishlistReducer(store = initialState, action: ProductsActions.ProductsActions) : productsState {
  switch (action.type) {
    case ProductsActions.INITIALIZEWISHLIST:
      let initProducts = (action as ProductsActions.initializeWishlistAction).payload;
      initProducts = initProducts == null? store.products : initProducts;
      // ==================== return fetched state =================
      return { ...store, products: [...store.products, ...initProducts] };
    case ProductsActions.ADD_TO_WISHLIST:
      const newProducts = (action as ProductsActions.addToWishlistAction).payload;
      console.log("Wishlist Store: ", store);
      return { ...store, products: [...store.products, newProducts] };
    default:
      return store;
    }
  }

