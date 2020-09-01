import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private user$: Subscription;
  public isAuthenticated: boolean;

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select('auth').subscribe(authState => {
      this.isAuthenticated = !!authState.user;
    });
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

  onSaveDataClick(evt): void {
    evt.preventDefault();
    this.store.dispatch(new RecipesActions.SaveRecipes());
  }

  onFetchDataClick(evt): void {
    evt.preventDefault();
    this.store.dispatch(new RecipesActions.GetRecipes());
  }

  onLogoutClick(evt) {
    evt.preventDefault();
    this.store.dispatch(new AuthActions.Logout());
  }
}
