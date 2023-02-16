import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  buildHeaders() {
    return (headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.apiUrl}`
    }));
  }

  getUsers(): Observable<User[]> {
    const headers = this.buildHeaders();
    return this.http
      .get(`${environment.apiUrl}/users`, { headers })
      .pipe(catchError(this.handleError));
  }

  getUser(id: string): Observable<User> {
    const headers = this.buildHeaders();
    return this.http
      .get(`${environment.apiUrl}/user/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  createUser(user: User): Observable<User> {
    const headers = this.buildHeaders();
    return this.http
      .post(`${environment.apiUrl}/user`, user, { headers })
      .pipe(catchError(this.handleError));
  }

  updateUser(id: string, user: User): Observable<User> {
    const headers = this.buildHeaders();
    return this.http
      .put(`${environment.apiUrl}/user/${id}`, user, { headers })
      .pipe(catchError(this.handleError));
  }
}
