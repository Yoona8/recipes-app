import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  private _ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this._ingredients = this.shoppingListService.ingredients;
    this.shoppingListService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this._ingredients = ingredients;
      });
  }

  get ingredients(): Ingredient[] {
    return this._ingredients;
  }
}
