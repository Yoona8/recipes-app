import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private id: number;
  public recipe: Recipe;

  constructor(
    private recipesService: RecipesService,
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
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
