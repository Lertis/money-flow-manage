import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistratonService } from '../services/auth/registraton.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  userName;
  userEmail
  userPassword;

  constructor(private regService: RegistratonService, private router: Router) { }

  ngOnInit() {
  }

  registration() {
    this.regService.registartion(this.userEmail, this.userPassword)
      .then((successReg) => {
        console.log(successReg);
        localStorage.setItem('userEmail', this.userEmail);
        localStorage.setItem('userPassword', this.userPassword);


        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: this.userName
        })
          .then(() => {
            console.log('Successfully updated user displayName !');
            this.router.navigate(['home']);
          })
          .catch((error) => {
            console.log('Error while updating profile');
          })

      })
      .catch((error) => {
        console.log('Error while reg process: ', error);
      })
  }

  goLoginPage() {
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
