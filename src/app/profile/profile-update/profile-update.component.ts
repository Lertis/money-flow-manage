import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { IUser } from '../../models/user.interface';
import { timer, Observable } from 'rxjs';
import { IUserCategories } from '../../models/user.categories';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss'],
})
export class ProfileUpdateComponent implements OnInit {

  user: IUser;
  constCategoriesNames:string[] = [];
  loadingUser = false;

  selectedSegment = 'const';

  constructor(private afs: AngularFirestore) {
/*     let userEmail = localStorage.getItem('userEmail');
    this.afs.collection('usersMoneyFlow', ref => ref.where('userEmail', '==', userEmail))
      .valueChanges().subscribe((users: IUser[]) => {
        users.forEach((user: IUser) => {
          this.user = user;
          timer(2000).subscribe(() => {
            this.loadingUser = true;
          })
        });
      }) */
   }

  ngOnInit() {
    let userEmail = localStorage.getItem('userEmail');
    this.afs.collection('usersMoneyFlow', ref => ref.where('userEmail', '==', userEmail))
      .valueChanges().subscribe((users: IUser[]) => {
        users.forEach((user: IUser) => {
          this.user = user;
          timer(2000).subscribe(() => {
            this.loadingUser = true;
          })
        });
      })
  }

}
