import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { of } from 'rxjs';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(environment.urlLogin, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }).pipe(
          map((responseData: AuthResponseData) => {
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + +responseData.expiresIn * 1000
            );

            return new AuthActions.AuthenticateSuccess({
              email: responseData.email,
              id: responseData.localId,
              token: responseData.idToken,
              expirationDate
            });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            let errorMessage = 'An unknown error occurred!';

            if (!errorResponse.error || !errorResponse.error.error) {
              return of(new AuthActions.AuthenticateFail(errorMessage));
            }

            switch (errorResponse.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'The email you\'ve entered already exists.';
                break;
              case 'EMAIL_NOT_FOUND':
              case 'INVALID_PASSWORD':
                errorMessage = 'Email and password do not match.';
                break;
            }

            return of(new AuthActions.AuthenticateFail(errorMessage));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => {
      this.router.navigate(['/recipes']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
