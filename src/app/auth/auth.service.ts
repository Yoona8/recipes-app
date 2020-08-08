import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const requests = {
  urlSignup: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  urlLogin: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  key: 'AIzaSyDuhX9fSL604_aS04y_v42tB1EB2oO2F1c'
};

@Injectable({providedIn: 'root'})
export class AuthService {
  private _user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${requests.urlSignup}${requests.key}`, {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        catchError(this._handleError),
        tap(response => {
          this._handleUserAuth(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${requests.urlLogin}${requests.key}`, {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        catchError(this._handleError),
        tap(response => {
          this._handleUserAuth(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  private _handleUserAuth(
    email: string,
    id: string,
    token: string,
    expIn: number
  ) {
    const now = new Date();
    const expDate = new Date(now.getTime() + expIn * 1000);
    const user = new User(email, id, token, expDate);

    this._user.next(user);
  }

  private _handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
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

    return throwError(errorMessage);
  }
}
