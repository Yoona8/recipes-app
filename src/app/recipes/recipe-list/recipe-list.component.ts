import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  private _recipes: Recipe[];
  private _recipesChanged$: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this._recipes = this.recipesService.recipes;
    this._recipesChanged$ = this.recipesService.recipesChanged$
      .subscribe((recipes: Recipe[]) => {
        this._recipes = recipes;
      });
  }

  get recipes(): Recipe[] {
    return this._recipes;
  }
}
