import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { environment } from '../../../environments/environment';
import * as RecipesActions from './recipes.actions';

@Injectable()
export class RecipesEffects {
  @Effect()
  getRecipes = this.actions$.pipe(
    ofType(RecipesActions.GET_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(environment.urlRecipes);
    }),
    map((recipes: Recipe[]) => {
      return recipes.map((recipe: Recipe) => {
        const ingredients = recipe.ingredients || [];

        return {...recipe, ingredients};
      });
    }),
    map((recipes: Recipe[]) => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
}
