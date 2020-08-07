import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private _isLogin = true;
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

    const {email, password} = this.authForm.value;

    if (this._isLogin) {
      // login
    } else {
      this.authService.signup(email, password).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }

    this.authForm.reset();
  }
}
