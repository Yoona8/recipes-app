import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

const requests = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  key: 'AIzaSyDuhX9fSL604_aS04y_v42tB1EB2oO2F1c'
};

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email, password) {
    return this.http.post<AuthResponseData>(`${requests.url}${requests.key}`, {
      email,
      password,
      returnSecureToken: true
    });
  }
}
