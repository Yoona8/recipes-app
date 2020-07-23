import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
// @ts-ignore
import * as recipesData from '../../../mocks/recipes.json';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  public recipes: Recipe[] = recipesData.default;
  @Output() recipeSelected = new EventEmitter<Recipe>();

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
