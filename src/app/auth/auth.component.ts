import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private _isLogin = true;
  private _isLoading = false;
  private _errorMessage: string;
  public authForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this._initForm();
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

    if (this._isLogin) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe(
      (response) => {
        this._isLoading = false;
      },
      (errorMessage) => {
        this._isLoading = false;
        this._errorMessage = errorMessage;
      }
    );

    this.authForm.reset();
  }
}
