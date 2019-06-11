import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from './services/auth/login.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { IUser } from './models/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Checks',
      url: '/checks/new-check',
      icon: 'list-box'
    },
    {
      title: 'Profile',
      url: '/profile/card',
      icon: 'contact'
    },
    {
      title: 'Statistics',
      url: '/statistics/cash',
      icon: 'pulse'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService,
    private afs: AngularFirestore
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
