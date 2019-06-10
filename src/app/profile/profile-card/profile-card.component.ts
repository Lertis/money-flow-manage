import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  userState: firebase.User;

  constructor(private afAuth: AngularFireAuth, private router: Router, private toastController: ToastController) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      this.userState = user;
    })
  }
  ngOnInit() {
    
  }

  async deleteAccount() {
    var user = firebase.auth().currentUser;
    const toast = await this.toastController.create({
      header: 'Really want to delete account?',
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          text: 'Yes',
          handler: () => {
            user.delete().then(() => {
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
      buttons: [
        {
          side: 'start',
          text: 'Yes',
          handler: () => {
            this.afAuth.auth.signOut();
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
