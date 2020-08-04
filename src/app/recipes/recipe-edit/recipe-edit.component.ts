import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup, Validators
} from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';

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
      'name': new FormControl(name, Validators.required),
      'image': new FormControl(image, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': this._ingredientControls
    });
  }

  private _addIngredientControl(ingredient?: Ingredient): void {
    const name = ingredient ? ingredient.name : '';
    const amount = ingredient ? ingredient.amount : '';

    this._ingredientControls.push(
      new FormGroup({
        'name': new FormControl(name, Validators.required),
        'amount': new FormControl(amount, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*/)
        ])
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
    const recipe: Recipe = {
      name: this.recipeForm.value['name'],
      description: this.recipeForm.value['description'],
      image: this.recipeForm.value['image'],
      ingredients: this.recipeForm.value['ingredients']
    };

    if (this._isEdit) {
      this.recipesService.updateRecipe(this._id, recipe);
      return;
    }

    this.recipesService.addRecipe(recipe);
  }
}
