import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${requests.urlSignup}${requests.key}`, {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        catchError(errorResponse => {
          let errorMessage = 'An unknown error occurred!';

          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
          }

          switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'The email you\'ve entered already exists.';
          }

          return throwError(errorMessage);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${requests.urlLogin}${requests.key}`, {
        email,
        password,
        returnSecureToken: true
      });
  }
}
