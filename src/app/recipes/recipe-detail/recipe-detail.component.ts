import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private _id: number;
  public recipe: Recipe;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this._id = +params.id;
      this.recipe = this.recipesService.getRecipe(this._id);
    });
  }

  get recipeId(): number {
    return this._id;
  }

  onAddToShoppingListClick(evt) {
    evt.preventDefault();
    this.recipesService
      .addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteClick(evt) {
    evt.preventDefault();
    this.recipesService.deleteRecipe(this._id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
