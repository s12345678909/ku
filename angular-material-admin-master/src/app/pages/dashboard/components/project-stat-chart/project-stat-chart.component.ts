import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { ProjectStatData, ProjectTimeData } from '../../models';
import { colors } from '../../../../consts';
import { ApexLegend, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptionsPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  dataLabels:any;
};

type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
};

enum ProjectsType {
  lightBlue = 'lightBlue',
  SingApp = 'SingApp',
  RNS = 'RNS'
}

@Component({
  selector: 'app-project-stat-chart',
  templateUrl: './project-stat-chart.component.html',
  styleUrls: ['./project-stat-chart.component.scss']
})
export class ProjectStatChartComponent implements OnInit {
  @Input() projectsStatsData: ProjectStatData;
  public selectedStatsLightBlueData: ProjectTimeData;
  public selectedStatsSingAppData: ProjectTimeData;
  public selectedStatsRNSData: ProjectTimeData;
  public chartOptions: Partial<ChartOptions>;
  public projectsType: typeof ProjectsType = ProjectsType;
  public colors: typeof colors = colors;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptionsPie: Partial<ChartOptionsPie>;

  public ngOnInit(): void {
    this.selectedStatsLightBlueData = this.projectsStatsData.lightBlue.daily;
    this.selectedStatsSingAppData = this.projectsStatsData.singApp.daily;
    this.selectedStatsRNSData = this.projectsStatsData.rns.daily;

    this.initChart();
  }

  public initChart(): void {

    this.chartOptions = {
      series: [
        { name: 'No of Developers in Jira Board', data: [10] },
        { name: 'No of Developers Checked in Code', data: [8] },
        { name: 'Lines of Code Checked in', data: [100] }
      ],
      chart: {
        type: 'bar',
        height: 100,
        width: 130,
        toolbar: {
          show: false
        }
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '70%',
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [
          'Sprint 15'

        ],
        labels: {
          show: false
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        show: false
      },
      /*tooltip: {
        y: {
          formatter(val) {
            return '$ ' + val + ' thousands';
          }
        }
      }*/
    };
    
    //pie chart
    this.chartOptionsPie = {

      series: [100, 55, 13, 43, 22],
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false,
      },
      chart: {
        type: "donut",
        height: 120,
        width: 130,
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],

      responsive: [
        {
          breakpoint: 480,
          options: {

            
            chart: {
              height: 100,
              width: 280,
            },
            
          }
        }
      ]
    };
  }

  public changeDateType(dateType: string, projectType: string): void {
    switch (projectType) {
      case this.projectsType.lightBlue:
        switch (dateType) {
          case 'Weekly':
            this.selectedStatsLightBlueData = this.projectsStatsData.lightBlue.week;
            break;
          case 'Monthly':
            this.selectedStatsLightBlueData = this.projectsStatsData.lightBlue.monthly;
            break;
          default:
            this.selectedStatsLightBlueData = this.projectsStatsData.lightBlue.daily;
        }
      break;
      case this.projectsType.SingApp:
        switch (dateType) {
          case 'Weekly':
            this.selectedStatsSingAppData = this.projectsStatsData.singApp.week;
            break;
          case 'Monthly':
            this.selectedStatsSingAppData = this.projectsStatsData.singApp.monthly;
            break;
          default:
            this.selectedStatsSingAppData = this.projectsStatsData.singApp.daily;
        }
      break;
      case this.projectsType.RNS:
        switch (dateType) {
          case 'Weekly':
            this.selectedStatsRNSData = this.projectsStatsData.rns.week;
            break;
          case 'Monthly':
            this.selectedStatsRNSData = this.projectsStatsData.rns.monthly;
            break;
          default:
            this.selectedStatsRNSData = this.projectsStatsData.rns.daily;
        }
      break;
    }
  }
}
