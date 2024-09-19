import { Product } from "../../shared/product.model";
import * as WishlistActions from './wishlist.actions';





export interface wishlistProductsState {
  products: Product[];
  error: string;
}

export const initialState: wishlistProductsState = {
  products: [],
  error: ""
}


export function wishlistReducer(store = initialState, action: WishlistActions.WishlistActions) : wishlistProductsState {
  switch (action.type) {
    case WishlistActions.INITIALIZEWISHLIST:
      let initProducts = (action as WishlistActions.initializeWishlistAction).payload;
      initProducts = initProducts == null? store.products : initProducts;
      // ==================== return fetched state =================
      return { ...store, products: [...store.products, ...initProducts] };
    case WishlistActions.ADD_TO_WISHLIST:
      const newProducts = (action as WishlistActions.addToWishlistAction).payload;
      console.log("Wishlist Store: ", store);
      return { ...store, products: [...store.products, newProducts] };
    case WishlistActions.DELETEWISHLISTITEM:
      let removeId = (action as WishlistActions.deleteWishlistItemAction).payload[1];
      let updatedProducts = [...store.products].filter((p: Product) => p._id !== removeId);
      return { ...store, products: updatedProducts };
    case WishlistActions.WISHLISTSUCCESS:
      return { ...store, products: (action as WishlistActions.WishlistSuccessAction).payload};
    default:
      return store;
    }
  }

