import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ICheck } from '../../models/check.interface';
import { timer } from 'rxjs';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-arrival-expenses',
  templateUrl: './arrival-expenses.component.html',
  styleUrls: ['./arrival-expenses.component.scss'],
})
export class ArrivalExpensesComponent implements OnInit {
  // lineChart
  public lineChartData: Array<any> = [
    { data: [0, 10, 40], label: 'Arrival / Expenses' }
  ];
  public lineChartLabels: Array<any> = ['', 'Pencil', 'found money'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  checksArray: ICheck[] = []
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private afs: AngularFirestore) {
    this.afs.collection('usersMoneyFlow').doc('c1ea4345-45b4-59e8-b9b7-2c1691644200')
    .collection('checks').valueChanges().subscribe((checks: ICheck[]) => {
      this.checksArray = checks;
    })
  }

  ngOnInit() {
/*     timer(1900).subscribe(() => {
      this.checksArray.forEach((each: ICheck) => {
        this.lineChartLabels.push(moment.unix(each.addedAt).format('YYYY-MM-DD hh:mm'))
        this.lineChartData.forEach((items) => {
          items.data.push(each.summary)
        })
        this.chart.chart.update();
      })
    }) */


    const new_data = {
      label: 'label 3',
      sum: 50
    }
    var statisticsRef = this.afs.collection('usersMoneyFlow').doc('c1ea4345-45b4-59e8-b9b7-2c1691644200')
    .collection('statistic').doc('personal-statistic').ref;
    // Firestore transaction to update data
    // https://firebase.google.com/docs/firestore/manage-data/transactions
    this.afs.firestore.runTransaction((t) => {
      return t.get(statisticsRef)
        .then(success => {
          let dataSnapshot = success.data()
          dataSnapshot.statistic.push({
            label: 'label 2',
            sum: dataSnapshot.statistic[dataSnapshot.statistic.length - 1].sum - new_data.sum
          })
         t.update(statisticsRef, dataSnapshot)
        })
        .catch(error => console.log(error))
    }).then(function () {
      console.log("Transaction  (added statistic) successfully committed!");
    }).catch(function (error) {
      console.log("Transaction failed: ", error);
    });
  }

 public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
