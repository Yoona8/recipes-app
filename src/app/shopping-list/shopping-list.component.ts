import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private _ingredients: Ingredient[];
  private _ingredientsChanged$: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this._ingredients = this.shoppingListService.ingredients;
    this._ingredientsChanged$ = this.shoppingListService.ingredientsChanged$
      .subscribe((ingredients: Ingredient[]) => {
        this._ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this._ingredientsChanged$.unsubscribe();
  }

  get ingredients(): Ingredient[] {
    return this._ingredients;
  }
}
