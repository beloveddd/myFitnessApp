import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, User } from 'src/auth/shared/services/auth/auth.service';
import { Store } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy{

  user$!: Observable<User>;
  subscription$!: Subscription;

  constructor(
    private store: Store, 
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.subscription$ = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  async onLogout() {
    await this.authService.logoutUser();

    this.router.navigate(['/auth/login']);
  }
}
