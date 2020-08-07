import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private _isLogin = true;
  public authForm: FormGroup;

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm() {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
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
    console.log(this.authForm.value);
    this.authForm.reset();
  }
}
