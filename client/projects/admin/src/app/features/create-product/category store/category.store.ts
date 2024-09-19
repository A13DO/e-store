import * as categoriesActions  from "./category.actions";



export interface AppState {
  categoriesState: CategoriesState;
}



export interface CategoriesState {
  categories: any[];
  error: string | null;
}

export const initialState: CategoriesState = {
  categories: [],
  error: null
};

export function categoriesReducer(
  state: CategoriesState = initialState,
  action: any
): CategoriesState {
    switch (action.type) {
    case categoriesActions.INITIALIZECATEGORIES:
      let initCategories = action.payload || state.categories;
      let ressult: any = [];
      initCategories = initCategories.map((categories: any) => Object.values(categories))
      console.log(initCategories);
      console.log(Object.keys(initCategories));
      for (let key of Object.keys(initCategories)) {
        ressult.push(initCategories[key][0])
      }
      console.log(ressult);

      // const initCategories = action.payload !== undefined ? action.payload : state.categories;
      return { ...state, categories: ressult };
    case categoriesActions.ADDCATEGORY:
      const category = action.payload;
      const categoryExists = state.categories.some(cat => cat === category);
      console.log(categoryExists);

      return {
        ...state,
        categories: categoryExists ? state.categories : [...state.categories, category],
        error: "This category already exists."
      };

    case categoriesActions.CATEGORIES_SUCCESS:
      let result: any = [];
      const categories = action.payload
      console.log(Object.keys(categories));
      for (let key of Object.keys(categories)) {
        console.log(categories[key]);
        result.push(categories[key])
      }
      return { ...state, categories: result};
    default:
      return state;
  }
}
// {
//   "username": "Omar",
//   "comment": "Good.",
//   "rating": 4
// }


// import * as authActions from "./auth.actions";
// import { User } from "../../../../core/interfaces/user.model";
// import * as authActions from "../../../../core/auth/store/auth.actions";
// import { CommentsActions, INITIALIZECOMMENTS, ADDCOMMENT, UPDATECOMMENT }  from "./comment.actions";


// export interface AppState {
//   commentsState: CommentsState;
// }

// export interface CommentsState {
//   user: User | null;
//   comment: string | null;
//   loading: boolean;

// }

// const initialState: CommentsState = {
//   user: null,
//   comment: null,
//   loading: false
// }



// export function commentsReducer(store = initialState, action: any) : CommentsState {
//   switch (action.type) {
//     case authActions.SIGNIN_START:
//       console.log("SIGNINStart!");
//       return store;
//     case authActions.SIGNUP_START:
//       console.log("SIGNINStart!");
//       return store;
//     case authActions.SIGNIN:
//       const user = new User(action.payload.email, action.payload.userId, action.payload.token,  action.payload.expirationDate)
//       console.log(user);
//       return store
//       case authActions.SIGNUP:
//       const userd = new User(action.payload.email, action.payload.userId, action.payload.token,  action.payload.expirationDate)
//         return store
//     case authActions.SIGNINFAILED:
//       return store
//     default:
//       return store
//   }
// }
