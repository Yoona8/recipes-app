import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
}

export const appReducerMap: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer
};
