import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthResponseData } from '../../models/auth-model.temp';
// import { environment } from '../../environments/environment';
import { User } from '../../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public user = new BehaviorSubject<User>(null); // store and info user state
  public tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  // signUp(email: string, password: string): Observable<AuthResponseData> {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
  //       environment.firebaseAPIKey,
  //       {
  //         email: email,
  //         password: password,
  //         returnSecureToken: true,
  //       },
  //     )
  //     .pipe(
  //       catchError(this._handleError),
  //       tap((resData: any) => {
  //         this._handleAuth(
  //           resData.email,
  //           resData.expiresIn,
  //           resData.idToken,
  //           +resData.expiresIn, // treated as number
  //         );
  //       }),
  //     );
  // }

  // signIn(email: string, pw: string): Observable<AuthResponseData> {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
  //       environment.firebaseAPIKey,
  //       {
  //         email: email,
  //         password: pw,
  //         returnSecureToken: true,
  //       },
  //     )
  //     .pipe(
  //       catchError(this._handleError),
  //       tap((resData: any) => {
  //         this._handleAuth(
  //           resData.email,
  //           resData.expiresIn,
  //           resData.idToken,
  //           +resData.expiresIn,
  //         );
  //       }),
  //     );
  // }

  // editUser(data:any): Observable<AuthResponseData> {
  //   return this.http

  // }

  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: string;
  //   } = JSON.parse(localStorage.getItem('userData'));
  //   if (!userData) {
  //     return;
  //   }

  //   const loaderUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     new Date(userData._tokenExpirationDate),
  //   );
  //   if (loaderUser.token) {
  //     this.user.next(loaderUser);
  //     const expirationDuration =
  //       new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
  //     this.autoLogout(expirationDuration);
  //   }
  // }

  // logout() {
  //   this.user.next(null);
  //   this.router.navigate(['/auth']);
  //   localStorage.removeItem('userData');
  //   if (this.tokenExpirationTimer) {
  //     clearTimeout(this.tokenExpirationTimer);
  //   }
  //   this.tokenExpirationTimer = null;
  // }

  // autoLogout(expiration: number) {
  //   this.tokenExpirationTimer = setTimeout(() => {
  //     this.logout();
  //   }, expiration);
  // }

  // // Create new user and login
  // private _handleAuth(
  //   email: string,
  //   userId: string,
  //   token: string,
  //   expiresIn: number,
  //   ) {
  //   const expirationDate = new Date(
  //     new Date().getTime() + expiresIn * 1000,
  //   );
  //   const user = new User(email, userId, token, expirationDate);
  //   this.user.next(user);
  //   this.autoLogout(expiresIn * 1000);
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }

  // private _handleError(errRes: HttpErrorResponse): Observable<never> {
  //   let errorMessg = 'An unknown error ocurred';
  //   if (!errRes.error || !errRes.error.error) {
  //     return throwError(errorMessg);
  //   }
  //   switch (errRes.error.error.message) {
  //   case 'EMAIL_EXISTS':
  //     errorMessg = 'This email exists already';
  //     break;
  //   case 'EMAIL_NOT_FOUND':
  //     errorMessg = 'This email does not exist';
  //     break;
  //   case 'INVALID_PASSWORD':
  //     errorMessg = 'This password is not correct';
  //     break;
  //   }
  //   return throwError(errorMessg);
  // }
}
