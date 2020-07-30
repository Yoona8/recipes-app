import { Component } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  constructor(private shoppingListService: ShoppingListService) {}

  onAddIngredient(form: NgForm): void {
    const formValue = form.value;
    const newIngredient: Ingredient = {
      name: formValue.name,
      amount: formValue.amount
    };

    this.shoppingListService.addIngredient(newIngredient);
  }
}
