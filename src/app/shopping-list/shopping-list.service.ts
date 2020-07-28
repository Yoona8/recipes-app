import { EventEmitter, Injectable } from '@angular/core';
// @ts-ignore
import * as ingredientsData from '../../mocks/ingredients.json';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  private _ingredients: Ingredient[] = ingredientsData.default;
  private _ingredientsChanged = new EventEmitter<Ingredient[]>();

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  get ingredientsChanged(): EventEmitter<Ingredient[]> {
    return this._ingredientsChanged;
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this._ingredientsChanged.emit(this._ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this._ingredientsChanged.emit(this._ingredients.slice());
  }
}
