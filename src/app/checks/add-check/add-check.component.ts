import { Component, OnInit } from '@angular/core';
import { IUserCategories } from '../../models/user.categories';
import * as constCategories from '../../shared/categories.list';
import { timer } from 'rxjs';

@Component({
  selector: 'app-add-check',
  templateUrl: './add-check.component.html',
  styleUrls: ['./add-check.component.scss'],
})
export class AddCheckComponent implements OnInit {

  selectedCategory: string;
  priceForCheck: number;
  descriptionForCheck: string;
  addingNewCheck = false;

  categoriesList: IUserCategories [] = [];
  
  constructor() {
    this.categoriesList = constCategories.categoriesList;
  }

  ngOnInit() {}

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
