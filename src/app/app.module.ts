import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAiJO92J23_BtDDCxDfdXvtY2MQpZw-Hyc",
  authDomain: "money-flow-manage.firebaseapp.com",
  databaseURL: "https://money-flow-manage.firebaseio.com",
  projectId: "money-flow-manage",
  storageBucket: "money-flow-manage.appspot.com",
  messagingSenderId: "478903223279",
  appId: "1:478903223279:web:51780a04a1c56e3d"
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFirestore,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
