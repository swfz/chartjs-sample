import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import * as Chart from 'chart.js';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('chartElem') chartElem: UIChart;
  chartData: any;
  chartOptions: any;
  data: any;
  snapshot: any;
  displayFlags: boolean[];

  ngOnInit(): void {
    this.chartData = {};
    this.chartOptions = {};
  }

  ngAfterViewInit() {
    this.displayFlags = [true, true, true];
    this.data = {
      dataset1: [1479, 102, 325],
      dataset2: [529496, 252436, 6375],
      dataset3: [6335002, 2828403, 35002]
    };
    this.snapshot = _.cloneDeep(this.data);
    this.setChartData();

    this.chartOptions = {
      scales: {
        xAxes: [
          {
            // id: 'data1',
            display: true,
            type: 'category',
            position: 'bottom'
          }
        ],
        yAxes: [
          {
            id: 'Dataset1',
            type: 'linear',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: 'Dataset1'
            },
            gridLines: {
              drawOnChartArea: true
            },
            stacked: true,
            ticks: {
              display: true,
              beginAtZero: true
            }
          },
          {
            id: 'Dataset2',
            type: 'linear',
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: 'Dataset2'
            },
            gridLines: {
              drawOnChartArea: true
            },
            stacked: true,
            ticks: {
              display: true,
              beginAtZero: true
            }
          },
          {
            id: 'Dataset3',
            type: 'linear',
            position: 'right',
            scaleLabel: {
              display: false,
              labelString: 'Dataset3'
            },
            gridLines: {
              drawOnChartArea: false
            },
            stacked: true,
            ticks: {
              display: false,
              beginAtZero: true
            }
          }
        ]
      },
      onClick: (event, activeElems) => {
        // ラベルをクリックしたらデータを一時的に表示しないようにする処理
        // ラベルをクリックしたかどうかの判定にY軸の値を取得して判定しているので
        // 前提として凡例などが上にある必要がある
        const clickPoint = Chart.helpers.getRelativePosition(
          event,
          this.chartElem.chart
        );

        // x-axis-0は options.scales.xAxesの中のIDの値と同等、何も指定がない場合は`x-axis-${i}`がキーとなる
        const clickX = this.chartElem.chart.scales['x-axis-0'].getValueForPixel(
          clickPoint.x
        );

        // 既存のデータセットの中でどれでも良いので適当なものをキーとする
        const clickY = this.chartElem.chart.scales['Dataset1'].getValueForPixel(
          clickPoint.y
        );

        if (clickY < 0) {
          this.reloadChartData(clickX, !this.displayFlags[clickX]);
        }
      }
    };
  }

  private setChartData() {
    this.chartData = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          type: 'line',
          label: 'Dataset1',
          borderColor: '#3399FF',
          backgroundColor: '#3399FF',
          yAxisID: 'Dataset1',
          pointStyle: 'circle',
          borderDash: [0, 10],
          fill: false,
          data: this.data.dataset1
        },
        {
          type: 'bar',
          label: 'Dataset2',
          borderColor: '#99FF33',
          borderWidth: 2,
          yAxisID: 'Dataset2',
          pointStyle: 'circle',
          fill: false,
          data: this.data.dataset2
        },
        {
          type: 'bar',
          label: 'Dataset3',
          borderColor: '#FF9933',
          borderWidth: 2,
          yAxisID: 'Dataset3',
          pointStyle: 'circle',
          fill: false,
          data: this.data.dataset3
        }
      ]
    };
  }

  private reloadChartData(x?: number, flag?: boolean) {
    if (x !== undefined && flag !== undefined) {
      if (flag) {
        this.data.dataset1[x] = this.snapshot.dataset1[x];
        this.data.dataset2[x] = this.snapshot.dataset2[x];
        this.data.dataset3[x] = this.snapshot.dataset3[x];
      } else {
        this.data.dataset1[x] = null;
        this.data.dataset2[x] = null;
        this.data.dataset3[x] = null;
      }
      this.displayFlags[x] = flag;
    }
    this.chartElem.chart.chart.update(this.chartOptions);
  }
}
