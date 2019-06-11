import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ICheck } from '../../models/check.interface';
import { IUser } from '../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private userId ;

  constructor(private afs: AngularFirestore) {
    let userEmail = localStorage.getItem('userEmail');
    this.afs.collection('usersMoneyFlow', ref => ref.where('userEmail', '==', userEmail))
    .valueChanges().subscribe((users: IUser[]) => {
      users.forEach((user: IUser) => {
        this.userId = user.userId;
      });
    })
  }

  addCheckToFirestore(check: ICheck) {
    return this.afs
    .collection('usersMoneyFlow').doc(this.userId)
    .collection('checks').doc(check.checkId)
    .set(check)
  }

  getUserId(): string {
    let userEmail = localStorage.getItem('userEmail');
    let userID = '';
    this.afs.collection('usersMoneyFlow', ref => ref.where('userEmail', '==', userEmail))
    .valueChanges().subscribe((users: IUser[]) => {
      users.forEach((user: IUser) => {
        userID = user.userId;
      });
    })
    return userID;
  }
}
