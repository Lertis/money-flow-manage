import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { AngularMaterialModule } from '../angular.material.module';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { ProfileCategoriesComponent } from './profile-categories/profile-categories.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      { path: 'card', component: ProfileCardComponent },
      { path: 'update', component: ProfileUpdateComponent }, 
      { path: 'categories', component: ProfileCategoriesComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AngularMaterialModule
  ],
  declarations: [
    ProfilePage,
    ProfileCardComponent,
    ProfileUpdateComponent,
    ImageViewerComponent,
    ProfileCategoriesComponent
  ],
  entryComponents: [ImageViewerComponent],
  providers: [Camera, BackgroundMode]
})
export class ProfilePageModule {}
