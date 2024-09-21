import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { CategoriesState } from './category.store';
import * as CategoriesActions  from "./category.actions";
import { RequestsService } from 'client/shop/src/app/core/services/requests.service';

@Injectable()
export class CategoryEffect {
  comments!: any

  constructor(
    private http: HttpClient,
    private requestsService: RequestsService,
    private actions$: Actions,
) {
    }
  categoryEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.ADDCATEGORY),
      switchMap((action: CategoriesActions.AddCategoryAction) => {
          const category = action.payload;
          return this.requestsService.addNewCategory(category)
        // .pipe(
        //   map((data) => new CategoriesActions.CategoriesSuccessAction(data)),
        //   catchError((err) => of(new CategoriesActions.CategoriesFailAction(err)))
        // )
        // send the new product (in service there fetched data update it then send)
    })
    )
    , {dispatch: false}
  );

}
