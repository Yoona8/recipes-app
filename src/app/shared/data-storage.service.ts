import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipesService } from '../recipes/recipes.service';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
  ) {}

  saveRecipes(): void {
    // const recipes = this.recipesService.recipes;
    // this.http.put(environment.urlRecipes, recipes)
    //   .subscribe(response => console.log(response));
  }
}
