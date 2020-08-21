import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private _ingredientEditStarted$: Subscription;
  private _ingredientIndex: number;
  private _isEdit = false;
  private _ingredient: Ingredient;
  private _defaultIcon = 'i-groceries.svg';
  @ViewChild('shoppingEditForm') shoppingEditForm: NgForm;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this._ingredientEditStarted$ = this.shoppingListService
      .ingredientEditStarted$.subscribe((index: number) => {
        this._ingredientIndex = index;
        this._isEdit = true;
        this._ingredient = this.shoppingListService.getIngredient(index);
        this.shoppingEditForm.setValue({
          name: this._ingredient.name,
          amount: this._ingredient.amount,
          icon: this._ingredient.icon || this._defaultIcon
        });
      });
  }

  ngOnDestroy(): void {
    this._ingredientEditStarted$.unsubscribe();
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
      this.shoppingListService
        .updateIngredient(this._ingredientIndex, newIngredient);
    } else {
      this.store
        .dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    this._isEdit = false;
    this.shoppingEditForm.reset();
  }

  onClearClick() {
    this._isEdit = false;
  }

  onDeleteClick() {
    if (this._ingredientIndex === undefined) {
      return;
    }

    this.shoppingListService.deleteIngredient(this._ingredientIndex);
    this._isEdit = false;
    this.shoppingEditForm.reset();
  }
}
