import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Content } from '../shared/content';
import { AuthResult } from './authresult';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private contUrl = 'https://localhost:8000';
  constructor(private http: HttpClient) {}

  createContent(content: Content, id:any): Observable<Content> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    content.id = null;
    console.log(content);
    const url = `${this.contUrl}/content/add/${id}`;

    return this.http
      .post<any>(url, JSON.stringify(content), { headers: headers })
      .pipe(
        tap((data) => console.log('createContent: ' + JSON.stringify(data))),
        map((data) => {
          return data.offer;
        }),
        catchError(this.handleError)
      );
  }
  getContentByList(idList: number): Observable<Content> {
    const url = `${this.contUrl}/content/${idList}`;
    return this.http.get<Content>(url).pipe(
      map((data) => {
        console.log('getContentByList: ' + JSON.stringify(data));
        return data;
      }),
      catchError(this.handleError)
    );
  }

  deleteContentOfList(idCon: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.contUrl}/content/${idCon}`;
    return this.http.delete<Content>(url, { headers: headers }).pipe(
      tap((data) => console.log('deleteContent: ' + idCon)),

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
