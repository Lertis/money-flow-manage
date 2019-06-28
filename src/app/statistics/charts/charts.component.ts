import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  public lineChartData: Array<any> = [
    { data: [12, 8, 5, 21, 43, 7, 4], label: 'Categories' }
  ];
  public lineChartLabels: Array<any> = [
    'Взуття', 'Інструменти та автотехніка', 'Канцелярія', 'Медицина', 'Напої та продукти', 'Побутова хімія', 'Ювелірні вироби'
  ];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'pie';

  constructor() {
  }

  ngOnInit() {}

}
