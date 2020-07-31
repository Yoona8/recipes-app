import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  @ViewChild('shoppingEditForm') shoppingEditForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this._ingredientEditStarted$ = this.shoppingListService
      .ingredientEditStarted$.subscribe((index: number) => {
        this._ingredientIndex = index;
        this._isEdit = true;
        this._ingredient = this.shoppingListService.getIngredient(index);
        this.shoppingEditForm.setValue({
          name: this._ingredient.name,
          amount: this._ingredient.amount
        });
      });
  }

  ngOnDestroy(): void {
    this._ingredientEditStarted$.unsubscribe();
  }

  get isEdit(): boolean {
    return this._isEdit;
  }

  onAddIngredient(form: NgForm): void {
    const formValue = form.value;
    const newIngredient: Ingredient = {
      name: formValue.name,
      amount: formValue.amount
    };

    if (this._isEdit) {
      this.shoppingListService
        .updateIngredient(this._ingredientIndex, newIngredient);
      return;
    }

    this.shoppingListService.addIngredient(newIngredient);
  }
}
