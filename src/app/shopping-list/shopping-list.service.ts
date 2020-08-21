import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
// @ts-ignore
import * as ingredientsData from '../../mocks/ingredients.json';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  private _ingredients: Ingredient[] = ingredientsData.default;
  public ingredientEditStarted$ = new Subject<number>();

  getIngredient(index: number): Ingredient {
    return this._ingredients[index];
  }

  updateIngredient(index: number, updatedIngredient: Ingredient): void {
    this._ingredients[index] = updatedIngredient;
  }

  deleteIngredient(index: number): void {
    this._ingredients.splice(index, 1);
  }
}
