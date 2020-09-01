import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { environment } from '../../../environments/environment';
import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../store/app.reducer';

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

  @Effect({ dispatch: false })
  saveRecipes = this.actions$.pipe(
    ofType(RecipesActions.SAVE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([, recipesState]) => {
      return this.http.put(environment.urlRecipes, recipesState.recipes);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
