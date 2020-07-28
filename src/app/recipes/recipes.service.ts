import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
// @ts-ignore
import * as recipesData from '../../mocks/recipes.json';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({providedIn: 'root'})
export class RecipesService {
  private _recipes: Recipe[] = recipesData.default;
  private _recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {}

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  get recipeSelected(): EventEmitter<Recipe> {
    return this._recipeSelected;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
