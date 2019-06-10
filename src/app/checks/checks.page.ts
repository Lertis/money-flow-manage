import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as constCategories from '../shared/categories.list';
import { IUserCategories } from '../models/user.categories';
import { timer } from 'rxjs';

@Component({
  selector: 'app-checks',
  templateUrl: './checks.page.html',
  styleUrls: ['./checks.page.scss'],
})
export class ChecksPage implements OnInit {

  selectedCategory: string;
  priceForCheck: number;
  descriptionForCheck: string;
  addingNewCheck = false;

  categoriesList: IUserCategories [] = [];
  constructor() {
    this.categoriesList = constCategories.categoriesList;
  }

  ngOnInit() {
  }

  selectCategory(category) {
    console.log(category);
  }

  addNewCheck() {
    timer(1000).subscribe(() => {
      this.addingNewCheck = true;
    })

    timer(2900).subscribe(() => {
      this.addingNewCheck = false;
    })
  }

}
