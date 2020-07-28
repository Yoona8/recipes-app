import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
// @ts-ignore
import * as recipesData from '../../mocks/recipes.json';

@Injectable({providedIn: 'root'})
export class RecipesService {
  private _recipes: Recipe[] = recipesData.default;
  private _recipeSelected = new EventEmitter<Recipe>();

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  get recipeSelected(): EventEmitter<Recipe> {
    return this._recipeSelected;
  }
}
