import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map , switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {

  }

  signInWithEmail(email: string, password: string): Observable<firebase.auth.UserCredential> {
    const p = this.afAuth.auth.signInWithEmailAndPassword(email, password);
    return fromPromise(p);
  }

  signUpWithEmail(email: string, password: string): Observable<any> {
    const p = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    return fromPromise(p);
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => user ? true : false));
  }

  getIdToken(): Observable<string> {
    //return fromPromise(this.afAuth.auth.currentUser.getIdToken(true))
    return this.afAuth.authState.pipe(switchMap(user => user.getIdToken(true)));
  }

  getCurrentUser(): Observable<firebase.User> {
    return this.afAuth.authState;
  }


  logout(): Observable<any> {
    const p = this.afAuth.auth.signOut();
    return fromPromise(p);
  }
}
