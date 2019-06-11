import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ICheck } from '../../models/check.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  addCheckToFirestore(check: ICheck) {
    return this.afs
    .collection('usersMoneyFlow').doc('07b472f7-a12e-6a42-695e-86374e7f215f')
    .collection('checks').doc(check.checkId)
    .set(check)
  }
}
