import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  public isLogin = true;
  public isLoading = false;
  public errorMessage: string | null;
  public authForm: FormGroup;
  private store$: Subscription;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.store$ = this.store.select('auth').subscribe(authState => {
      this.errorMessage = authState.errorMessage;
      this.isLoading = authState.loading;
    });
  }

  ngOnDestroy(): void {
    if (this.store$) {
      this.store$.unsubscribe();
    }
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

  private switchLogin() {
    this.isLogin = !this.isLogin;
    this.store.dispatch(new AuthActions.ClearError());
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

    const {email, password} = this.authForm.value;

    if (this.isLogin) {
      this.store.dispatch(new AuthActions.LoginStart({
        email,
        password
      }));
    } else {
      this.store.dispatch(new AuthActions.SignupStart({
        email,
        password
      }));
    }

    this.authForm.reset();
  }
}
