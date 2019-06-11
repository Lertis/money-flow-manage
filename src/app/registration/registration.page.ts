import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistratonService } from '../services/auth/registraton.service';
import * as firebase from 'firebase';
import { FormGroup, FormControl } from '@angular/forms';
import { IUser } from '../models/user.interface';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  regForm: FormGroup;
  regUser: IUser = {
    userName: '',
    userEmail: '',
    userPassword: ''
  }

  constructor(
    private regService: RegistratonService,
    private router: Router,
    private toastCntl: ToastController) {
    this.regForm = new FormGroup({
      'userName': new FormControl(),
      'userEmail': new FormControl(),
      'userPassword': new FormControl()
    })
  }

  ngOnInit() {
  }

  registration(regUser: IUser) {
    this.regService.registartion(regUser.userEmail, regUser.userPassword)
      .then((successReg) => {
        console.log(successReg);
        localStorage.setItem('userEmail', regUser.userEmail);
        localStorage.setItem('userPassword', regUser.userPassword);

        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: regUser.userName
        })
          .then(() => {
            console.log('Successfully updated user displayName !');
            this.router.navigate(['checks', 'new-check'], { replaceUrl: true });
          })
          .catch((error) => {
            console.log('Error while updating profile');
          })

        this.regService.addUserToFirestore(regUser);

      })
      .catch(async (error) => {
        const toast = await this.toastCntl.create({
          duration: 2000,
          header: 'Error: ' + error.code,
          position: 'bottom',
          message: 'Details: ' + error.message,
          cssClass: "text-center-toast"
        });
        toast.present();
      })
  }

  goLoginPage() {
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
