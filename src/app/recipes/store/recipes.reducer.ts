import { Recipe } from '../recipe.model';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: null
};

export function recipesReducer(
  state: State = initialState,
  action
) {
  switch (action.type) {
    default:
      return state;
  }
}
