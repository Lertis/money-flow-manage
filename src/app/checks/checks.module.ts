import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChecksPage } from './checks.page';
import { AngularMaterialModule } from '../angular.material.module';
import { AddCheckComponent } from './add-check/add-check.component';
import { ChecksListComponent } from './checks-list/checks-list.component';

const routes: Routes = [
  {
    path: '',
    component: ChecksPage,
    children: [
      { path: 'new-check', component: AddCheckComponent },
      { path: 'check-list', component: ChecksListComponent}
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
  declarations: [ChecksPage, AddCheckComponent, ChecksListComponent]
})
export class ChecksPageModule {}
