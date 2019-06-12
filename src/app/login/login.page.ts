import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IUser } from '../models/user.interface';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loginUser: IUser = {
    userEmail: '',
    userPassword: ''
  }

  constructor(private router: Router,
    private loginService: LoginService,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private toastCntl: ToastController) {
    this.loginForm = new FormGroup({
      'userEmail': new FormControl(),
      'userPassword': new FormControl()
    })

    this.afs.collection('usersMoneyFlow', ref => ref.where('userEmail', '==', localStorage.getItem('userEmail'))).valueChanges()
    .subscribe((users: IUser[]) => {
      users.forEach((each: IUser) => {
        localStorage.setItem('userId', each.userId);
      })
    })
  }

  ngOnInit() {
    this.checkCredentials();
  }

  async checkCredentials() {
    const toastAutoLogin = await this.toastCntl.create({
      duration: 1500,
      header: 'Checking data for auto logging..',
      position: 'bottom',
      cssClass: "text-center-toast"
    });
    toastAutoLogin.present()
      .then((success) => {
        if (this.loginService.isAuthorized()) {
          this.loginService.login(localStorage.getItem('userEmail'), localStorage.getItem('userPassword'))
            .then((successLogin) => {
              this.router.navigate(['checks', 'new-check'], { replaceUrl: true });
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
            });
        }
      })
      .catch((error) => {
        console.log('autologinError!')
      })
  }

  loginUserSubmit(user: IUser) {
    this.loginService.login(user.userEmail, user.userPassword)
      .then((successLogin) => {
        console.log(successLogin);
        localStorage.setItem('userEmail', user.userEmail);
        localStorage.setItem('userPassword', user.userPassword);
        this.router.navigate(['checks', 'new-check'], { replaceUrl: true });
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
      });
  }

  goRegPage() {
    this.router.navigate(['registration'], { replaceUrl: true })
  }
}
