import {OrderItem} from './order-item';

export interface Order {
  id: number;
  full_name: string;
  email: string;
  total_price: number;
  order_items: OrderItem[];
}
