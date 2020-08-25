import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private user$: Subscription;
  public isAuthenticated: boolean;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select('auth').subscribe(authState => {
      this.isAuthenticated = !!authState.user;
    });
  }

  onSaveDataClick(evt): void {
    evt.preventDefault();
    this.dataStorageService.saveRecipes();
  }

  onFetchDataClick(evt): void {
    evt.preventDefault();
    this.dataStorageService.getRecipes().subscribe();
  }

  onLogoutClick(evt) {
    evt.preventDefault();
    this.store.dispatch(new AuthActions.Logout());
  }
}
