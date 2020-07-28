import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  private _recipes: Recipe[];
  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this._recipes = this.recipesService.recipes;
  }

  get recipes(): Recipe[] {
    return this._recipes;
  }

  onRecipeSelected(recipe: Recipe): void {
    this.recipeSelected.emit(recipe);
  }
}
