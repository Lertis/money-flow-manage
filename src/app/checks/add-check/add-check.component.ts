import { Component, OnInit } from '@angular/core';
import { IUserCategories } from '../../models/user.categories';
import * as constCategories from '../../shared/categories.list';
import { timer } from 'rxjs';
import { ICheck } from '../../models/check.interface';
import { UUID } from 'angular2-uuid';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { ToastController } from '@ionic/angular';

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

  constructor(private firestoreService: FirestoreService, private toastController: ToastController) {
    this.categoriesList = constCategories.categoriesList;
  }

  ngOnInit() { }

  selectCategory(category) {
    console.log(category);
  }

  addNewCheck() {
    this.addingNewCheck = true;
    let uuid = UUID.UUID();

    let finalCheckToAdd: ICheck = {
      addedAt: new Date(),
      addedPhoto: null,
      category: this.selectedCategory,
      checkId: uuid,
      description: this.descriptionForCheck,
      summary: this.priceForCheck
    }

    this.firestoreService.addCheckToFirestore(finalCheckToAdd)
      .then(() => {
        timer(1500).subscribe(async () => {
          const toast = await this.toastController.create({
            duration: 20000,
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
  }
}
