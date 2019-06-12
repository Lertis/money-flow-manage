import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { timer } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { IUser } from '../../models/user.interface';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  userState: firebase.User;
  userPhotoUrl;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    private afs: AngularFirestore
  ) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      this.userState = user;
    })
    this.afs.collection('usersMoneyFlow').doc(localStorage.getItem('userId')).valueChanges().subscribe((user: IUser) => {
      this.userPhotoUrl = user.userPhoto;
    })
  }
  ngOnInit() {
  
  }

  async deleteAccount() {
    var user = firebase.auth().currentUser;
    const toast = await this.toastController.create({
      header: 'Really want to delete account?',
      position: 'bottom',
      cssClass: "text-center-toast",
      buttons: [
        {
          side: 'start',
          text: 'Yes',
          handler: () => {
            user.delete().then(() => {
              localStorage.removeItem('userPassword');
              localStorage.removeItem('userEmail');
              localStorage.removeItem('userId');
              this.router.navigate(['login'], { replaceUrl: true })
            })
              .catch((error) => {
                console.log(error);
              })
          }
        }, {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  async signOut() {
    const toast = await this.toastController.create({
      header: 'Really want to sign out?',
      position: 'bottom',
      cssClass: "text-center-toast",
      buttons: [
        {
          side: 'start',
          text: 'Yes',
          handler: () => {
            this.afAuth.auth.signOut();
            localStorage.removeItem('userPassword');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userId');
            this.router.navigate(['login'], { replaceUrl: true });
          }
        }, {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

}
