import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  errorMessage: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  errorMessage: null,
  loading: false
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user: User = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
        errorMessage: null,
        loading: false
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        errorMessage: action.payload,
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        loading: false
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: null
      };
    default:
      return state;
  }
}
