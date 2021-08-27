import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends RestService {
  endpoint: string = `${environment.api}/orders`;

  exportCsv(): Observable<any> {
    return this.http.post(`${environment.api}/export-csv`, {}, {responseType: 'blob'});
  }

  generateChart(): Observable<any> {
    return this.http.get(`${environment.api}/orders-by-date`);
  }
}
