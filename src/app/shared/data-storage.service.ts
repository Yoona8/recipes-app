import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) {}

  saveRecipes(): void {
    const recipes = this.recipesService.recipes;
    this.http.put(environment.urlRecipes, recipes)
      .subscribe(response => console.log(response));
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(environment.urlRecipes).pipe(
      map((recipes: Recipe[]) => {
        return recipes.map((recipe: Recipe) => {
          const ingredients = recipe.ingredients || [];

          return {...recipe, ingredients};
        });
      }),
      tap((recipes: Recipe[]) => {
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
