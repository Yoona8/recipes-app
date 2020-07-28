import { Ingredient } from '../shared/ingredient.model';

export interface Recipe {
  name: string;
  description: string;
  image: string;
  ingredients: Ingredient[];
}
