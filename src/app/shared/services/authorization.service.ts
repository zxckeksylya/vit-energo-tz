import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { from, of } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  public login(user: LoginForm) {
    return from(
      this.afAuth.signInWithEmailAndPassword(user.email, user.password)
    );
  }

  public registration(user: LoginForm) {
    return from(
      this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    );
  }

  public getCurrentUser() {
    return from(this.afAuth.currentUser);
  }

  public logout() {
    return from(this.afAuth.signOut());
  }

  public setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    userRef.set(userData, {
      merge: true,
    });
    return of(userData);
  }
}
