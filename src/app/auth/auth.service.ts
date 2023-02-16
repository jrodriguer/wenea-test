import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { UserCredential } from '@firebase/auth-types';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthResponseData } from '../../models/auth-model.temp';
import { environment } from '../../environments/environment';
import { User } from '../../models/user.model';
import { Address, UserDoc } from '../../models/ddbb.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenExpirationTimer: any;
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router
  ) {}

  signUp(email: string, password: string, name: string, address: Address) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential: UserCredential) => {
        const token = userCredential.user?.getIdToken();
        token?.then((idToken) => {
          this._handleAuth(
            email,
            userCredential.user?.uid || '',
            name,
            idToken,
            address
          );
        });
      })
      .catch((error) => this._handleError(error));
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential: UserCredential) => {
        const token = userCredential.user?.getIdToken();
        token?.then((idToken: string) => {
          this._getUserDocByEmail(email).subscribe((user: UserDoc | null) => {
            if (user) {
              this._handleAuth(
                email,
                userCredential.user?.uid || '',
                user.name,
                idToken,
                user.address
              );
            }
          });
        });
      })
      .catch((error) => this._handleError(error));
  }

  private _getUserDocByEmail(email: string): Observable<UserDoc | null> {
    return this.afs
      .collection<UserDoc>('users', (ref) => ref.where('email', '==', email))
      .valueChanges({ idField: 'id' })
      .pipe(
        take(1),
        map((users: UserDoc[]) => {
          if (users && users.length > 0) {
            return users[0];
          } else {
            return null;
          }
        })
      );
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
      userData.email,
      userData.uid,
      userData.name,
      userToken,
      tokenExpirationDate,
      userData.address
    );
    console.info('auto login', currentUser);
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

  private _handleAuth(
    email: string,
    uid: string,
    name: string,
    token: string,
    address?: Address
  ) {
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    const user = new User(email, uid, name, token, expirationDate, address);
    this.userSubject.next(user);
    this.autoLogout(3600 * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private _handleError(error: any): Promise<never> {
    console.error('An error occurred:', error);
    return Promise.reject(error.message || error);
  }
}
