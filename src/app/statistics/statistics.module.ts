import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { IonicModule } from '@ionic/angular';

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
    ChartsModule
  ],
  declarations: [StatisticsPage, ArrivalExpensesComponent, ChartsComponent]
})
export class StatisticsPageModule {}
