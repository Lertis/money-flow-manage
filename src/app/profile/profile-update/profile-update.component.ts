import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { IUser } from '../../models/user.interface';
import { timer, Observable } from 'rxjs';
import { IUserCategories } from '../../models/user.categories';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx'
@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss'],
})
export class ProfileUpdateComponent implements OnInit {

  user: IUser;
  constCategoriesNames:string[] = [];
  loadingUser = false;

  photoToFireStore: any;

  selectedSegment = 'const';

  constructor(private afs: AngularFirestore, private camera: Camera, private backgroundMode: BackgroundMode) {
/*     let userEmail = localStorage.getItem('userEmail');
    this.afs.collection('usersMoneyFlow', ref => ref.where('userEmail', '==', userEmail))
      .valueChanges().subscribe((users: IUser[]) => {
        users.forEach((user: IUser) => {
          this.user = user;
          timer(2000).subscribe(() => {
            this.loadingUser = true;
          })
        });
      }) */
   }

  ngOnInit() {
    let userEmail = localStorage.getItem('userEmail');
    this.afs.collection('usersMoneyFlow', ref => ref.where('userEmail', '==', userEmail))
      .valueChanges().subscribe((users: IUser[]) => {
        users.forEach((user: IUser) => {
          this.user = user;
          timer(2000).subscribe(() => {
            this.loadingUser = true;
          })
        });
      })
  }

  takePhoto() {
    this.backgroundMode.enable();
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 400,
      targetWidth: 400,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photoToFireStore = base64Image;
    }).catch((err) => {
      console.log("Error: ", err);
    });

    this.backgroundMode.disable();
  }

}
