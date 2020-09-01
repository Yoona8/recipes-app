import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const GET_RECIPES = '[Recipes] Get Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class GetRecipes implements Action {
  readonly type = GET_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export type RecipesActions = SetRecipes | GetRecipes | AddRecipe;
