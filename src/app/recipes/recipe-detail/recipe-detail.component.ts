import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as RecipesActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private id: number;
  public recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      map((params: Params) => +params.id),
      switchMap(recipeId => {
        this.id = recipeId;
        return this.store.select('recipes');
      }),
      map(recipesState => {
        return recipesState.recipes
          .find((recipe, index) => index === this.id);
      })
    ).subscribe((recipe: Recipe) => this.recipe = recipe);
  }

  onAddToShoppingListClick(evt) {
    evt.preventDefault();
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  onDeleteClick(evt) {
    evt.preventDefault();
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
