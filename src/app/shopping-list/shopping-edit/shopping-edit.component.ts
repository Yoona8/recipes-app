import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private ingredientsEdit$: Subscription;
  private _isEdit = false;
  private _ingredient: Ingredient;
  private _defaultIcon = 'i-groceries.svg';
  @ViewChild('shoppingEditForm') shoppingEditForm: NgForm;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredientsEdit$ = this.store.select('shoppingList').subscribe(
      (stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this._isEdit = true;
          this._ingredient = stateData.editedIngredient;
          this.shoppingEditForm.setValue({
            name: this._ingredient.name,
            amount: this._ingredient.amount,
            icon: this._ingredient.icon || this._defaultIcon
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.ingredientsEdit$.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  get isEdit(): boolean {
    return this._isEdit;
  }

  onSubmit(form: NgForm): void {
    const formValue = form.value;
    const newIngredient: Ingredient = {
      name: formValue.name,
      amount: formValue.amount,
      icon: formValue.icon
    };

    if (this._isEdit) {
      this.store
        .dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      this.store
        .dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    this._isEdit = false;
    this.shoppingEditForm.reset();
  }

  onClearClick() {
    this._isEdit = false;
    this.shoppingEditForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDeleteClick() {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
    );
    this._isEdit = false;
    this.shoppingEditForm.reset();
  }
}
