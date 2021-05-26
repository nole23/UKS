import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, scaleService } from 'chart.js';
import { Label, Color, SingleDataSet } from 'ng2-charts';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-repository-statistic',
  templateUrl: './repository-statistic.component.html',
  styleUrls: ['./repository-statistic.component.scss']
})
export class RepositoryStatisticComponent implements OnInit {


  tabName: String;
  project: any;
  barChartData: ChartDataSets[];
  lineChartColors: Color[];
  barChartOptions: ChartOptions;
  barChartLabels: Label[];
  barChartType: ChartType;
  barChartLegend: any;
  barChartPlugins: any;
  pieChartData: SingleDataSet;
  pieChartLabels: Label[];
  pieChartType: ChartType;
  pieChartLegend: any;
  pieChartPlugins: any;
  pieChartOptions: ChartOptions;
  pieChartColors: Array<any>;
  isShow: boolean;
  isShowIssue: boolean;
  constructor(private repositoryService: RepositoryService) {
    this.tabName = 'options';
    this.project = JSON.parse(localStorage.getItem('project'));
    this.isShow = false;
    this.isShowIssue = false;
  }

  //TODO maybe make more grid views like contributors (their issues comments etc)
  //TODO hardcore values in base to show bar chart grid
  ngOnInit(): void {
    this._getParam()
    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(33, 136, 56)',
      },
    ];

    this.barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [];

    this.pieChartLabels = [['Open'], ['Closed']];
    this.pieChartType = 'pie';
    this.pieChartLegend = true;
    this.pieChartPlugins = [];
    this.pieChartOptions = {
      responsive: true,
    }

    this.pieChartColors = [{
      backgroundColor: ['rgba(33, 136, 56)', 'rgb(215,58,74)']
    }];
  }

  _getParam() {
    this.repositoryService.getParam(this.project.id)
      .subscribe(res => {
        let data = JSON.parse(res['data'])
        this.barChartData = [
          { data: data['count_of_ammount'], label: 'Number of new files' }
        ];

        let max = Math.max(...data['count_of_ammount'])

        this.barChartOptions = {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                stepSize: 1,
                beginAtZero: true,
                max: max + 1,
                min: 0
              }
            }]
          }
        };

        this.pieChartData = data['count_of_issues'];
        this.isShow = true;
        this.isShowIssue = true;
      })
  }

}
