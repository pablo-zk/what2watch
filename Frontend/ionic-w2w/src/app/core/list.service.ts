import { Injectable } from '@angular/core';
import { List } from '../shared/list';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private listUrl = 'http://localhost:8000/list';

  constructor(private http: HttpClient) {}

  getLists(): Observable<List[]> {
    return this.http.get<List[]>(this.listUrl).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getMaxListId(): Observable<number> {
    return this.http.get<List[]>(this.listUrl).pipe(
      // Get max value from an array
      map((data) =>
        Math.max.apply(
          Math,
          data.map(function (o) {
            return o.id;
          })
        )
      ),
      catchError(this.handleError)
    );
  }

  getListById(id: number): Observable<List> {
    const url = `${this.listUrl}/${id}`;
    return this.http.get<List>(url).pipe(
      map((data) => {
        console.log('getListById: ' + JSON.stringify(data));
        return data;
      }),
      catchError(this.handleError)
    );
  }

  createList(list: List): Observable<List> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    list.id = null;
    console.log(list);

    return this.http.post<List>(this.listUrl, list, { headers: headers }).pipe(
      tap((data) => console.log('createList: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteList(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.listUrl}/${id}`;
    return this.http.delete<List>(url, { headers: headers }).pipe(
      tap((data) => console.log('deleteList: ' + id)),
      catchError(this.handleError)
    );
  }

  updateList(list: List): Observable<List> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.listUrl}/${list.id}`;
    return this.http.put<List>(url, list, { headers: headers }).pipe(
      tap(() => console.log('updateList: ' + list.id)),
      // Return the trip on an update
      map(() => list),
      catchError(this.handleError)
    );
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
