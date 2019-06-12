import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUser } from '../../models/user.interface';
import { timer } from 'rxjs';
import { ICheck } from '../../models/check.interface';

@Component({
  selector: 'app-checks-list',
  templateUrl: './checks-list.component.html',
  styleUrls: ['./checks-list.component.scss'],
})
export class ChecksListComponent implements OnInit {

  currentUserId = '';

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

  userChecks: ICheck[] = [];
  filteredOrSorted: ICheck[] = [];

  spinOldest = true;
  spinNewest = true;
  spinTime = true;

  constructor(private afs: AngularFirestore) {
    this.afs.collection('usersMoneyFlow', ref => ref.where('userEmail', '==', localStorage.getItem('userEmail'))).valueChanges()
    .subscribe((users: IUser[]) => {
      users.forEach((each: IUser) => {
        this.currentUserId = each.userId;
        this.userCategories = each.categories.categoriesList;
      })
    })

    this.afs.collection('usersMoneyFlow').doc(localStorage.getItem('userId')).collection('checks').valueChanges().subscribe((checks: ICheck[]) => {
      this.userChecks = checks;
    })
  }

  ngOnInit() {
/*    timer(2000).subscribe(() => {
      console.log('Category: ', this.filteredOrSorted = this.userChecks.filter((data) => data.category === 'Домашні улюбленці'));
    })  */

    timer(2000).subscribe(() => {
      console.log(this.filteredOrSorted = this.userChecks.filter((data) => data.category === 'Домашні улюбленці'));
    }) 
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

  changeRadioButtonInCategories($event) {
    console.log($event)
  }

}
