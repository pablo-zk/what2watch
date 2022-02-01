import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import { Content } from '../shared/content';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url = 'http://localhost:8000/movies';

  constructor(private http: HttpClient) {}

  //Posible error por el memoryWebApi de core/core.module.ts - Intenta buscar esa ruta dentro del proyecto, puede que no admita direcciones externas. Al quitarlo da otro error por permisos del cord...
  getContent(): Observable<Content[]> {
    return this.http.get<Content[]>(this.url).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getContentById(id: number): Observable<Content> {
    const url = `${this.url}/${id}`;
    return this.http.get<Content>(url).pipe(
      tap((data) => console.log('getContent: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
