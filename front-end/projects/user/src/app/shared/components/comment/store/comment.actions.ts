import { Action } from "@ngrx/store";


export const INITIALIZECOMMENTS  = "initialize-comments";
export const ADDCOMMENT  = "add-comment";
export const UPDATECOMMENT  = "update-comment";
export const COMMENTS_SUCCESS  = "comments-success";
export const COMMENTS_FAIL  = "comments-fail";



export class initializeCommentsAction implements Action {
  readonly type: string = INITIALIZECOMMENTS;
  constructor(public payload: any) {}
}
export class AddCommentAction implements Action { // takes comment, rating
  readonly type: string = ADDCOMMENT;
  constructor(public payload: { productID: string; comment: any }) {}
}
export class CommentsSuccessAction implements Action {
  readonly type = COMMENTS_SUCCESS;
  constructor(public payload: any) {}
}

export class CommentsFailAction implements Action {
  readonly type = COMMENTS_FAIL;
  constructor(public payload: any) {}
}
export class UpdateCommentAction implements Action { // takes comment, rating
  readonly type: string = UPDATECOMMENT;
  constructor(public payload: { productID: string; uid: string | undefined; comment: any }) {}
}

export type CommentsActions =
  | initializeCommentsAction
  | AddCommentAction
  | UpdateCommentAction
  | CommentsSuccessAction
  | CommentsFailAction





