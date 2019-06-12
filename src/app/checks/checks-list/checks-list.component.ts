import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUser } from '../../models/user.interface';
import { timer } from 'rxjs';

@Component({
  selector: 'app-checks-list',
  templateUrl: './checks-list.component.html',
  styleUrls: ['./checks-list.component.scss'],
})
export class ChecksListComponent implements OnInit {

  sortBySelected: string;

  searchTerm: any = "";

  selectedFilterValue = "notSelected";

  methodList = [
    { name: 'Oldest first' },
    { name: 'Newest first' },
    { name: 'Time' },
    { name: 'Category' },
  ];

  userCategories = [];

  constructor(private afs: AngularFirestore) {
    this.afs.collection('usersMoneyFlow', ref => ref.where('userEmail', '==', localStorage.getItem('userEmail'))).valueChanges()
    .subscribe((users: IUser[]) => {
      users.forEach((each: IUser) => {
        this.userCategories = each.categories.categoriesList;
      })
    })
  }

  ngOnInit() {
/*     timer(20000).subscribe(() => {
      this.selectedFilterValue = 'selected';
    }) */
  }

  ionViewDidLoad() {
    this.setFilteredItems();
  }

  sortBy($event) {

  }

  setFilteredItems() {
    this.userCategories = this.filterItems(this.searchTerm);
  }

  filterItems(searchTerm) {
    return this.userCategories.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  }

  changeRadioButton($event) {
    console.log($event)
    this.selectedFilterValue = $event.detail.value;
  }

}
