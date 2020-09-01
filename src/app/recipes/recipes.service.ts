import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({providedIn: 'root'})
export class RecipesService {
  private _recipes: Recipe[] = [];

  deleteRecipe(id) {
    this._recipes.splice(id, 1);
  }
}
