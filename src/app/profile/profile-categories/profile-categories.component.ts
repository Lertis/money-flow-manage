import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUser } from '../../models/user.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-profile-categories',
  templateUrl: './profile-categories.component.html',
  styleUrls: ['./profile-categories.component.scss'],
  animations: [
    trigger('loadCategories', [
      state('in', style({})),
      transition('void => *', [
        style({ height: 0, opacity: 0 }),
        animate(400, style({ height: '*', opacity: 1}))
      ])
    ])
  ]
})
export class ProfileCategoriesComponent implements OnInit {

  allUserCategories = [];

  items = [
    {name: 'ONE'},
    {name: 'TWO'}
  ]

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit() {
    this.afs.collection('usersMoneyFlow').doc('c1ea4345-45b4-59e8-b9b7-2c1691644200').valueChanges().subscribe((res: IUser) => {
      // this.allUserCategories = res.categories.categoriesList; //all

      this.allUserCategories = res.categories.categoriesList.filter((data) => {
       return data.canBeDeleted === true
      });
      // can be deleted === added by user

    })
  }

  updateCategory(ctg) {

  }

  deleteCategory(ctg) {

  }

}
