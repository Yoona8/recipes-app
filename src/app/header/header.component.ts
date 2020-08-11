import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
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
}
