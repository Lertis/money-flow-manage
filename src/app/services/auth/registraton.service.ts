import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from 'src/app/models/user.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { UUID } from 'angular2-uuid';
import * as constCategories from '../../shared/categories.list';

@Injectable({
  providedIn: 'root'
})
export class RegistratonService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  registartion(userEmail, userPassword): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword);
  }

  addUserToFirestore(regUser: IUser) {
    let uuid = UUID.UUID()
    console.log(regUser);
    this.afs.collection('usersMoneyFlow').doc(uuid).set({
      userId: uuid,
      userName: regUser.userName,
      userEmail: regUser.userEmail,
      userPassword: regUser.userPassword,
      categories: constCategories
    })
  }
}
