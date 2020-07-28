import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
// @ts-ignore
import * as recipesData from '../../mocks/recipes.json';

@Injectable({providedIn: 'root'})
export class RecipesService {
  private _recipes: Recipe[] = recipesData.default;

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }
}
