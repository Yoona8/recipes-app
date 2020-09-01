import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient
  ) {}

  saveRecipes(): void {
    // const recipes = this.recipesService.recipes;
    // this.http.put(environment.urlRecipes, recipes)
    //   .subscribe(response => console.log(response));
  }
}
