import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputElement: ElementRef;
  @ViewChild('amountInput') amountInputElement: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddIngredient(evt): void {
    evt.preventDefault();

    const newIngredient: Ingredient = {
      name: this.nameInputElement.nativeElement.value,
      amount: this.amountInputElement.nativeElement.value
    };

    this.shoppingListService.addIngredient(newIngredient);
  }
}
