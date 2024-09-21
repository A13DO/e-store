import { Action } from "@ngrx/store";


export const INITIALIZECATEGORIES  = "initialize-categories";
export const ADDCATEGORY  = "add-category";
export const CATEGORIES_SUCCESS  = "categories-success";
export const CATEGORIES_FAIL  = "categories-fail";
// export const UPDATECOMMENT  = "update-comment";



export class initializeCategoriesAction implements Action {
  readonly type: string = INITIALIZECATEGORIES;
  constructor(public payload: any) {}
}
export class AddCategoryAction implements Action { // takes comment, rating
  readonly type: string = ADDCATEGORY;
  constructor(public payload: any) {}
}
export class CategoriesSuccessAction implements Action {
  readonly type = CATEGORIES_SUCCESS;
  constructor(public payload: any) {}
}

export class CategoriesFailAction implements Action {
  readonly type = CATEGORIES_FAIL;
  constructor(public payload: any) {}
}
// export class UpdateCommentAction implements Action { // takes comment, rating
//   readonly type: string = UPDATECOMMENT;
//   constructor(public payload: { productID: string; uid: string | undefined; comment: any }) {}
// }

export type CategoriesActions =
  | initializeCategoriesAction
  | AddCategoryAction
  | CategoriesSuccessAction
  | CategoriesFailAction





