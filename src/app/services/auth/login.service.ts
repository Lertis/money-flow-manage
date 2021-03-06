import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afAuth: AngularFireAuth) { }

  login(userEmail, userPassword): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(userEmail, userPassword);
  }

  isAuthorized(): boolean {
    if (localStorage.getItem('userEmail') && localStorage.getItem('userPassword')) {
      return true;
    } else return false;
  }
}
