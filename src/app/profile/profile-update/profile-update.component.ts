import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from '../../services/firebase/firestore.service';
import { IUser } from '../../models/user.interface';
import { timer, Observable } from 'rxjs';
import { IUserCategories } from '../../models/user.categories';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx'
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { ModalController } from '@ionic/angular';

import * as firebase from 'firebase';

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

  imgSource: any;
  imgTitle = '';
  imgDescription = '';

  constructor(
    private afs: AngularFirestore,
    private camera: Camera,
    private backgroundMode: BackgroundMode,
    public modalController: ModalController) {
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

  async viewImage(src: string, title: string = '', description: string = '') {
    const modal = await this.modalController.create({
      component: ImageViewerComponent,
      componentProps: {
        imgSource: src,
        imgTitle: this.user.userName,
        imgDescription: this.user.userName
      },
      cssClass: 'modal-fullscreen',
      keyboardClose: true,
      showBackdrop: true
    });

    return await modal.present();
  }

  uploadPhoto(){ 
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.photoToFireStore, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
      snapshot.ref.getDownloadURL()
        .then(success => {
          this.updateProfilePhoto(success);
        })
        .catch(error => console.log(error))
    });
  }

  updateProfilePhoto(imageURL) {
      var userRef = this.afs.collection('usersMoneyFlow').doc('c1ea4345-45b4-59e8-b9b7-2c1691644200').ref;
      // Firestore transaction to update data
      // https://firebase.google.com/docs/firestore/manage-data/transactions
      this.afs.firestore.runTransaction((t) => {
        return t.get(userRef)
          .then(success => {
            let dataSnapshot = success.data() as IUser
            dataSnapshot.userPhoto = imageURL;
            t.update(userRef, dataSnapshot)
          })
          .catch(error => console.log(error))
      }).then(function () {
        console.log("Transaction successfully committed!");
      }).catch(function (error) {
        console.log("Transaction failed: ", error);
      });
  }

}
