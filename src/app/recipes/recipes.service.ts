import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipesService {
  private _recipes: Recipe[] = [];
  public recipesChanged$ = new Subject<Recipe[]>();

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.recipesChanged$.next(this.recipes.slice());
  }

  getRecipe(id): Recipe {
    return this._recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipesChanged$.next(this._recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe) {
    this._recipes[id] = newRecipe;
    this.recipesChanged$.next(this._recipes.slice());
  }

  deleteRecipe(id) {
    this._recipes.splice(id, 1);
    this.recipesChanged$.next(this._recipes.slice());
  }
}
