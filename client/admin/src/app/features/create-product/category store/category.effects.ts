import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import * as CategoriesActions from './category.actions';
import { ProductService } from 'client/shop/src/app/core/services/product.service';

@Injectable()
export class CategoryEffect {
  comments!: any;

  constructor(
    private http: HttpClient,
    private _ProductService: ProductService,
    private actions$: Actions
  ) {}
  categoryEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoriesActions.ADDCATEGORY),
        switchMap((action: CategoriesActions.AddCategoryAction) => {
          const category = action.payload;
          return this._ProductService.addNewCategory(category);
        })
      ),
    { dispatch: false }
  );
}
