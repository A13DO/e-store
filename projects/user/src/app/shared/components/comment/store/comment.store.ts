import { Comment } from "projects/user/src/app/core/interfaces/comment.model";
import * as ProductsActions from "../../../../store/actions";





export interface CommentsState {
  comments: Comment[];
  error: string;
}

export const initialState: CommentsState = {
  comments: [],
  error: ""
}


export function commentsReducer(store = initialState, action: ProductsActions.ProductsActions) : CommentsState {
  switch (action.type) {
    case ProductsActions.INITIALIZECOMMENTS:
      let initComments = (action as ProductsActions.initializeCommentsAction).payload;
      initComments = initComments == null? store.comments : initComments;
    //   // ==================== return fetched state =================
      return { ...store, comments: [...store.comments, ...initComments] };
    case ProductsActions.ADD_TO_WISHLIST:
    //   const newProducts = (action as ProductsActions.addToWishlistAction).payload;
    //   console.log("Wishlist Store: ", store);
    //   return { ...store, products: [...store.products, newProducts] };
    //   case ProductsActions.WISHLISTSUCCESS:
    //     return { ...store, products: (action as ProductsActions.WishlistSuccessAction).payload};
    default:
      return store;
    }
  }

