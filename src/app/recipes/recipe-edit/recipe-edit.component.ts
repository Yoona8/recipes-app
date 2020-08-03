import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup
} from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  private _id: number;
  private _isEdit = false;
  private _ingredientControls: FormArray;
  public recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this._id = +params.id;
      this._isEdit = params.id !== undefined;
      this._initRecipeForm();
    });
  }

  private _initRecipeForm(): void {
    let name = '';
    let image = '';
    let description = '';

    this._ingredientControls = new FormArray([]);

    if (this._isEdit) {
      const recipe = this.recipesService.getRecipe(this._id);
      name = recipe.name;
      image = recipe.image;
      description = recipe.description;

      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredient: Ingredient) => {
          this._addIngredientControl(ingredient);
        });
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name),
      'image': new FormControl(image),
      'description': new FormControl(description),
      'ingredients': this._ingredientControls
    });
  }

  private _addIngredientControl(ingredient?: Ingredient): void {
    const name = ingredient ? ingredient.name : '';
    const amount = ingredient ? ingredient.amount : '';

    this._ingredientControls.push(
      new FormGroup({
        'name': new FormControl(name),
        'amount': new FormControl(amount)
      })
    );
  }

  get ingredientControls(): AbstractControl[] {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  get image(): string {
    return (<FormControl>this.recipeForm.get('image')).value;
  }

  get isEdit(): boolean {
    return this._isEdit;
  }

  onAddIngredientClick() {
    this._addIngredientControl();
  }

  onSubmit() {
    console.log(this.recipeForm);
  }
}
