import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResult } from './authresult';
import * as moment from 'moment';

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
        tap((res) => console.log('logged in ' + JSON.stringify(res))),
        catchError(this.handleError)
      );
  }

  register(username: string, password: string, type: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post<AuthResult>(
        this.authUrl + '/register',
        { username, password, type },
        { headers }
      )
      .pipe(tap((res) => console.log('registered ' + JSON.stringify(res))));
  }

  setSession(authResult) {
    const expiresAt = moment().add(authResult.expires_at, 'second');

    localStorage.setItem('u', authResult.u);
    localStorage.setItem('r', authResult.r);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('u');
    localStorage.removeItem('r');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  isLoggedIn() {
    let now = moment();
    return now.isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    let expiration_date = moment(expiresAt);
    return expiration_date;
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
    return localStorage.getItem('r') === 'ROLE_STUDENT'
      ? 's'
      : localStorage.getItem('r') === 'ROLE_EMPLOYER'
      ? 'e'
      : localStorage.getItem('r') === 'ROLE_ARTEAN'
      ? 'a'
      : '';
  }

  getState() {
    const username = localStorage.getItem('u');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post<any>(this.authUrl + '/state', { username }, { headers })
      .pipe(
        tap((res) => {
          console.log('registered ' + JSON.stringify(res));
        }),
        map((data) => {
          return data.state;
        })
      );
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
