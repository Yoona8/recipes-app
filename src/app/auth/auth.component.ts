import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private _isLogin = true;
  private _isLoading = false;
  private _errorMessage: string | null;
  public authForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.store.select('auth').subscribe(authState => {
      this._errorMessage = authState.errorMessage;
      this._isLoading = authState.loading;
    });
  }

  private _initForm() {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  get isLogin(): boolean {
    return this._isLogin;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  switchLogin() {
    this._isLogin = !this._isLogin;
    this._errorMessage = null;
    this.authForm.reset();
  }

  onSwitchModeClick(evt) {
    evt.preventDefault();
    this.switchLogin();
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    this._isLoading = true;

    const {email, password} = this.authForm.value;
    let authObservable: Observable<AuthResponseData>;

    console.log(this._isLogin);

    if (this._isLogin) {
      // authObservable = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({
        email,
        password
      }));
    } else {
      authObservable = this.authService.signup(email, password);
    }

    this.authForm.reset();
  }
}
