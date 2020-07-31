import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
// @ts-ignore
import * as ingredientsData from '../../mocks/ingredients.json';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  private _ingredients: Ingredient[] = ingredientsData.default;
  public ingredientsChanged$ = new Subject<Ingredient[]>();
  public ingredientEditStarted$ = new Subject<number>();

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientsChanged$.next(this._ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged$.next(this._ingredients.slice());
  }

  getIngredient(index: number): Ingredient {
    return this._ingredients[index];
  }

  updateIngredient(index: number, updatedIngredient: Ingredient): void {
    this._ingredients[index] = updatedIngredient;
    this.ingredientsChanged$.next(this._ingredients.slice());
  }
}
