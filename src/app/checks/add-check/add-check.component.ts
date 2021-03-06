import { Component, OnInit } from '@angular/core';
import { IUserCategories } from '../../models/user.categories';
import * as constCategories from '../../shared/categories.list';
import { timer } from 'rxjs';
import { ICheck } from '../../models/check.interface';
import { UUID } from 'angular2-uuid';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUser } from '../../models/user.interface';
import * as moment from 'moment';

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

  categoriesList: IUserCategories[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private toastController: ToastController,
    private afs: AngularFirestore) {
    this.categoriesList = constCategories.categoriesList;

    this.afs.collection('usersMoneyFlow', ref => ref.where('userEmail', '==', localStorage.getItem('userEmail')))
    .valueChanges().subscribe((users: IUser[]) => {
      users.forEach((each: IUser) => {
        localStorage.setItem('userId', each.userId);
      })
    })
  }

  ngOnInit() { }

  selectCategory(category) {
    console.log(category);
  }

  async addNewCheck() {
    if (this.priceForCheck || this.selectedCategory) {
      this.addingNewCheck = true;
      let uuid = UUID.UUID();

      let finalCheckToAdd: ICheck = {
        addedAt: moment(new Date()).unix(),
        addedPhoto: null,
        category: this.selectedCategory? this.selectedCategory : null,
        checkId: uuid,
        description: this.descriptionForCheck ? this.descriptionForCheck : null,
        summary: this.priceForCheck ? this.priceForCheck : null
      }

      this.firestoreService.addCheckToFirestore(finalCheckToAdd)
        .then(() => {
          timer(1500).subscribe(async () => {
            const toast = await this.toastController.create({
              duration: 2000,
              header: 'A new check has been successfully added',
              position: 'bottom',
              cssClass: "text-center-toast"
            });
            toast.present();
            this.addingNewCheck = false;
          })
        })
        .catch((error) => {
          console.log('Error when adding to Firestore:', error)
          this.addingNewCheck = false;
        })
    } else {
      const toastFillFields = await this.toastController.create({
        duration: 4000,
        header: 'Fields category and price are required',
        position: 'bottom',
        cssClass: "text-center-toast"
      });
      toastFillFields.present();
    }

  }
}
