import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { UserCredential } from '@firebase/auth-types';
import { BehaviorSubject, Observable } from 'rxjs';

import { AuthResponseData } from '../../models/auth-model.temp';
import { environment } from '../../environments/environment';
import { User } from '../../models/user.model';
import { Address } from '../../models/interfaces.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenExpirationTimer: any;
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(
    public afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  signUp(email: string, password: string, name: string, address: Address) {
    console.log({ email, password });
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const token = result.user?.getIdToken();
        token?.then((idToken) => {
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          const user = new User(
            address,
            email,
            result.user?.uid || '',
            '',
            idToken || '',
            expirationDate
          );
          this._handleAuth(user);
        });
      })
      .catch((error) => this._handleError(error));
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential: firebase.default.auth.UserCredential) => {
        const token = userCredential.user?.getIdToken();
        token?.then((idToken) => {
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          const user = new User(
            {} as Address,
            email,
            userCredential.user?.uid || '',
            '',
            idToken || '',
            expirationDate
          );
          this._handleAuth(user);
        });
      })
      .catch((error) => this._handleError(error));
  }

  autoLogin() {
    const userData: {
      address: Address;
      email: string;
      uid: string;
      name: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }

    const userToken = userData._token;
    const tokenExpirationDate = new Date(userData._tokenExpirationDate);
    const currentUser = new User(
      userData.address,
      userData.email,
      userData.uid,
      userData.name,
      userToken,
      tokenExpirationDate
    );
    if (currentUser.token) {
      this.userSubject.next(currentUser);
      this.autoLogout(tokenExpirationDate.getTime() - new Date().getTime());
    }
  }

  logout() {
    this.afAuth.signOut();
    this.userSubject.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['login']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private _handleAuth(user: User) {
    console.info({ user });

    const getTokenExpirationDate = user.token ? user.tokenExpirationDate : null;
    this.userSubject.next(user);
    this.autoLogout(
      getTokenExpirationDate
        ? getTokenExpirationDate.getTime() - new Date().getTime()
        : 0
    );
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private _handleError(error: any): Promise<never> {
    console.error('An error occurred:', error);
    return Promise.reject(error.message || error);
  }
}
