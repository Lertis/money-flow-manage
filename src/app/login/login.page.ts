import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userEmail: string | any;
  userPassword: string;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.userEmail, this.userPassword)
    .then((successLogin) => {
      console.log(successLogin);
      localStorage.setItem('userEmail', this.userEmail);
      localStorage.setItem('userPassword', this.userPassword);
      this.router.navigate(['home']);
    })
    .catch((error) => {
      console.log('Error while login process!');
    });
  }

  goRegPage() {
    this.router.navigate(['registration'], { replaceUrl: true })
  }

}
