import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RestService} from "./rest.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends RestService {
  endpoint: string = `${environment.api}/roles`;

  // constructor(private http: HttpClient) { }

  // all(): Observable<any> {
  //   return this.http.get<any>(this.endpoint);
  // }
}
