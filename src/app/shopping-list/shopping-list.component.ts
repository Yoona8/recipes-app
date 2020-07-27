import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
// @ts-ignore
import * as ingredientsData from '../../mocks/ingredients.json';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  public ingredients: Ingredient[] = ingredientsData.default;

  onIngredientAdded(ingredient): void {
    this.ingredients.push(ingredient);
  }
}
