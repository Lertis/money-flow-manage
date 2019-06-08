import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RegistratonService {

  constructor(private afAuth: AngularFireAuth) { }

  registartion(userEmail, userPassword): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword);
  }
}
