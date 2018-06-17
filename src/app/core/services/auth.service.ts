import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import * as firebase from 'firebase/app';
import { FirebaseResponseError } from '../errors/common';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  private formatErrors(error): Observable<any>  {
    const firebaseResponseError = <FirebaseResponseError> error;
    return ErrorObservable.create<FirebaseResponseError>(firebaseResponseError);
  }

  signInWithEmail(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    const p = this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return fromPromise(p).pipe(catchError(this.formatErrors));
  }

  signUpWithEmail(
    email: string,
    password: string,
    name: string
  ): Observable<firebase.auth.UserCredential> {
    const p = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    return fromPromise(p).pipe(
      tap(async (credential: firebase.auth.UserCredential) => {
         await credential.user.updateProfile({ displayName: name, photoURL: null });
      }),
      catchError(this.formatErrors)
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => (user ? true : false)),
      catchError(this.formatErrors)
    );
  }

  getIdToken(): Observable<string> {
    return this.afAuth.authState.pipe(
      switchMap(user => user.getIdToken(true)),
      catchError(this.formatErrors)
    );
  }

  getCurrentUser(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  logout(): Observable<any> {
    const p = this.afAuth.auth.signOut();
    return fromPromise(p).pipe(catchError(this.formatErrors));
  }
}
