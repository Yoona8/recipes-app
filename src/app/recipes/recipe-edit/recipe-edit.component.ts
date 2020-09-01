import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup, Validators
} from '@angular/forms';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private _id: number;
  private _isEdit = false;
  private _ingredientControls: FormArray;
  private store$: Subscription;
  public recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this._id = +params.id;
      this._isEdit = params.id !== undefined;
      this._initRecipeForm();
    });
  }

  ngOnDestroy(): void {
    if (this.store$) {
      this.store$.unsubscribe();
    }
  }

  private _initRecipeForm(): void {
    let name = '';
    let image = '';
    let description = '';

    this._ingredientControls = new FormArray([]);

    if (this._isEdit) {
      this.store$ = this.store.select('recipes').pipe(
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this._id;
          });
        })
      ).subscribe(recipe => {
        name = recipe.name;
        image = recipe.image;
        description = recipe.description;

        if (recipe.ingredients) {
          recipe.ingredients.forEach((ingredient: Ingredient) => {
            this._addIngredientControl(ingredient);
          });
        }
      });
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
      this.store.dispatch(new RecipesActions.UpdateRecipe({
        index: this._id,
        recipe
      }));
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(recipe));
    }

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancelClick() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredientClick(controlIndex: number) {
    this._ingredientControls.removeAt(controlIndex);
  }
}
