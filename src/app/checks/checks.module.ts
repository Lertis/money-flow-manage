import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChecksPage } from './checks.page';
import { AngularMaterialModule } from '../angular.material.module';

const routes: Routes = [
  {
    path: '',
    component: ChecksPage
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
  declarations: [ChecksPage]
})
export class ChecksPageModule {}
