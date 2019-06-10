import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


import { ChartModule } from 'primeng/chart';

import { StatisticsPage } from './statistics.page';
import { ChartsComponent } from './charts/charts.component';
import { ArrivalExpensesComponent } from './arrival-expenses/arrival-expenses.component';

const routes: Routes = [
  {
    path: '',
    component: StatisticsPage,
    children: [
      { path: 'cash', component: ArrivalExpensesComponent },
      { path: 'charts', component: ChartsComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChartModule
  ],
  declarations: [StatisticsPage, ArrivalExpensesComponent, ChartsComponent]
})
export class StatisticsPageModule {}
