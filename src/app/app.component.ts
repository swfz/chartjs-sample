import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  chartData = {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        type: 'line',
        label: 'Dataset1',
        borderColor: '#3399FF',
        backgroundColor: '#3399FF',
        // borderWidth: 0,
        yAxisID: 'Dataset1',
        pointStyle: 'circle',
        borderDash: [0, 10],
        fill: false,
        data: [
          1479, 102, 325
        ]
      },
      {
        type: 'bar',
        label: 'Dataset2',
        borderColor: '#99FF33',
        // backgroundColor: '#99FF33',
        borderWidth: 2,
        yAxisID: 'Dataset2',
        pointStyle: 'circle',
        fill: false,
        data: [
          529496,252436,6375
        ]
      },
      {
        type: 'bar',
        label: 'Dataset3',
        borderColor: '#FF9933',
        // backgroundColor: '#FF9933',
        borderWidth: 2,
        yAxisID: 'Dataset3',
        pointStyle: 'circle',
        fill: false,
        data: [
          6335002,2828403,35002
        ]
      }
    ]
  };
  chartOptions = {
    scales: {
      xAxes: [
        {
          id: 'data1',
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
    }
  };
}
