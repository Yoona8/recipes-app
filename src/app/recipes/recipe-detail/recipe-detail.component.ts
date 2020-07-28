import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private recipesService: RecipesService) {}

  onAddToShoppingListClick(evt) {
    evt.preventDefault();
    this.recipesService
      .addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
