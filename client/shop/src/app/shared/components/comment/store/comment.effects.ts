import { addCommentAction } from './../../../../store/actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CommentsState } from './comment.store';
import * as CommentsActions  from "./comment.actions";
import { RequestsService } from 'client/shop/src/app/core/services/requests.service';

@Injectable()
export class CommentsEffect {
  private selectCommentsState = (state: CommentsState) => state.comments;
  comments!: any

  constructor(
    private http: HttpClient,
    private requestsService: RequestsService,
    private actions$: Actions,
    private store: Store<any>) {
    }
  commentsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.ADDCOMMENT),
      switchMap((action: CommentsActions.AddCommentAction) => {
          const { productID, comment } = action.payload;
        return this.requestsService.saveComment(
          productID,
          comment
        )
        .pipe(
          map((data) => new CommentsActions.CommentsSuccessAction(data)),
          catchError((err) => of(new CommentsActions.CommentsFailAction(err)))
        )
        // send the new product (in service there fetched data update it then send)
    })
    )
    // , {dispatch: false}
  );
  updateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentsActions.UPDATECOMMENT),
      switchMap((action: CommentsActions.UpdateCommentAction) => {
        const { productID, uid, comment } = action.payload;
        return this.requestsService.updateComment(productID, uid, comment)
        .pipe(
          map((data) => new CommentsActions.CommentsSuccessAction(data)),
          catchError((err) => of(new CommentsActions.CommentsFailAction(err)))
        )
      })
    )
  );

}
