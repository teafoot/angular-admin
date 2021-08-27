import { Component, OnInit } from '@angular/core';
import {Order} from "../../interfaces/order";
import {OrderService} from "../../services/order.service";
import {animate, group, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('orderItemsTableState', [
      state('show', style({
        maxHeight: '150px',
        height: '150px',
        overflowY: 'auto',
      })),
      state('hide', style({
        maxHeight: 0,
        height: 0,
        overflowY: 'hidden'
      })),
      transition('show => hide', animate('250ms ease-out')),
      transition('hide => show', animate('250ms ease-in')),
    ])
  ]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  lastPage: number;
  selected: number;
  show = false;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.load();
  }

  load(page = 1): void {
    this.orderService.all(page).subscribe(res => {
      this.orders = res.data;
      this.lastPage = res.meta.last_page;
      this.show = true;
    });
  }

  selectOrder(id: number): void {
    this.selected = this.selected === id ? 0 : id; // 0 is unselect, id is select (toggle)
  }

  viewOrderItemState(id: number): string {
    return this.selected === id ? 'show' : 'hide'; // for animation
  }

  exportCsv(): void {
    this.orderService.exportCsv().subscribe(res => {
        // const blob = new Blob([res], {type: 'text/csv'});
        // console.log({blob})

        const downloadUrl = window.URL.createObjectURL(res);
        console.log({downloadUrl}); // e.g. blob:http://localhost:4200/7fff503c-e180-46ea-95ac-38eea2377886
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'orders.csv';
        link.click();
      }
    );
  }
}

// transition(
//   'show => hide',
//   group([
//     animate('250ms ease-out', style({ height: 0 })),
//     animate('250ms steps(1,start)', style({ overflowY: 'hidden' }))
//   ]),
// ),
//   transition(
//     'hide => show',
//     group([
//       animate('250ms ease-in', style({ height: '150px' })),
//       animate('250ms steps(1,end)', style({ overflowY: 'auto' }))
//     ])
//   )

// group([
//   animate("250ms", keyframes([
//     style({ height: "150px", offset: 1 }),
//     style({ height: 0, offset: 0 }),
//   ])),
//   animate("250ms", keyframes([
//     style({ overflowY: 'auto', offset: 1 }),
//     style({ overflowY: 'hidden', offset: 0 }),
//   ])),
// ])
