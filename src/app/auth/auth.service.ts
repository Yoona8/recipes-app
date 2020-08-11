import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
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
  public user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

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

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const expirationDate = new Date(userData._tokenExpirationDate);

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      expirationDate
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const now = new Date().getTime();
      const expirationDuration = expirationDate.getTime() - now;
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private _handleUserAuth(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);

    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
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
