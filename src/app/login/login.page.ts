import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IUser } from '../models/user.interface';
import { ToastController } from '@ionic/angular';

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
    private fb: FormBuilder,
    private toastCntl: ToastController) {
    this.loginForm = new FormGroup({
      'userEmail': new FormControl(),
      'userPassword': new FormControl()
    })
  }

  ngOnInit() {
  }

  login(user: IUser) {
    this.loginService.login(user.userEmail, user.userPassword)
    .then((successLogin) => {
      console.log(successLogin);
      localStorage.setItem('userEmail', user.userEmail);
      localStorage.setItem('userPassword', user.userPassword);
      this.router.navigate(['checks'], { replaceUrl: true });
    })
    .catch(async (error) => {
      const toast = await this.toastCntl.create({
        duration: 2000,
        header: 'Error: ' + error.code,
        position: 'bottom',
        message: 'Details: ' + error.message
      });
      toast.present();
    });
    console.log(user)
  }

  goRegPage() {
    this.router.navigate(['registration'], { replaceUrl: true })
  }

  submit() {

  }
}