import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from '../models/user.interface';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
