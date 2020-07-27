import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  private newIngredient: Ingredient;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('nameInput') nameInputElement: ElementRef;
  @ViewChild('amountInput') amountInputElement: ElementRef;

  onAddIngredient(evt): void {
    evt.preventDefault();
    this.newIngredient = {
      name: this.nameInputElement.nativeElement.value,
      amount: this.amountInputElement.nativeElement.value
    };
    this.ingredientAdded.emit(this.newIngredient);
  }
}
