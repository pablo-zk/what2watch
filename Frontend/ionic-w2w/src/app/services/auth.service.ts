import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../shared/user';
import { AuthResult } from './authresult';
//import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'https://localhost:8000';
  private privateAuthUrl = 'https://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post<AuthResult>(
        this.authUrl + '/login_check',
        { username, password },
        { headers }
      )
      .pipe(
        tap((res) => console.log('logged in ' + JSON.stringify(res)))
        // map((res) => this.setSession(username))
        // catchError(this.handleError)
      );
  }

  register(username: string, password: string, type: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post<User>(
        this.authUrl + '/register',
        { username, password, type },
        { headers }
      )
      .pipe(
        map((res) => {
          this.setSession;
          console.log('registered ' + JSON.stringify(res));
        })
      );
  }

  setSession(authResult) {
    localStorage.setItem('u', authResult.u);
    localStorage.setItem('r', authResult.r);
    localStorage.setItem('token', authResult.token);
  }

  logout() {
    localStorage.removeItem('u');
    localStorage.removeItem('token');
    console.log('logout' + localStorage.getItem('u'));
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getState() {
    const username = localStorage.getItem('u');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post<any>(this.authUrl + '/state', { username }, { headers })
      .pipe(
        tap((res) => {
          console.log('userIsRegistered ' + JSON.stringify(res));
        }),
        map((data) => {
          return data.state;
        })
      );
  }

  role(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post<string[]>(
        this.authUrl + '/role',
        { username, password },
        { headers }
      )
      .pipe(
        tap((res) => {
          console.log('registered ' + JSON.stringify(res));
        })
      );
  }

  getRole() {
    return localStorage.getItem('r') === 'ROLE_KID' ? 'k' : '';
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    alert(`An error occurred: ${err.error.message}`);
    console.error(err);
    return throwError(errorMessage);
  }
}
