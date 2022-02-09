import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private _loginService: AuthService, private _router: Router) {}
  canActivate() {
    if (this._loginService.isLoggedIn()) return true;
    // imperative navigation
    this._router.navigate(['login']);
    return false;
  }
}
