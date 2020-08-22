import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public ingredients$: Observable<{ingredients: Ingredient[]}>;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList');
  }

  onIngredientClick(evt, id) {
    evt.preventDefault();
    this.store.dispatch(
      new ShoppingListActions.StartEdit(id)
    );
  }
}
