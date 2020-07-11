import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
// @ts-ignore
import * as recipesData from '../../../mocks/recipes.json';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = recipesData.default;

  constructor() {}

  ngOnInit(): void {}
}
