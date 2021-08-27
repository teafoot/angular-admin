import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import * as c3 from 'c3';
import * as d3 from 'd3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    let chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'Date',
        columns: [
          ['Date'],
          ['Sales'],
        ],
        types: {
          Sales: 'bar'
        }
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      },
      tooltip: {
        format: {
          // @ts-ignore
          value: d3.format('$')
        }
      }
    });

    this.orderService.generateChart().subscribe((results: { date: string, order_total: number }[]) => {
        // console.log({results});
        chart.load({
          columns: [
            ['Date', ...results.map(result => result.date)],
            ['Sales', ...results.map(result => result.order_total)]
          ]
        });
      }
    );
  }
}
