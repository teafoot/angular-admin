import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces/user";
import {RestService} from "./rest.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends RestService {
  endpoint: string = `${environment.api}/users`;

  // constructor(private http: HttpClient) { }

  // all(page: number): Observable<any> {
  //   return this.http.get<any>(`${this.endpoint}?page=${page}`);
  // }
  //
  // get(id: number): Observable<User> {
  //   return this.http.get<User>(`${this.endpoint}/${id}`);
  // }
  //
  // create(data: User): Observable<User> {
  //   return this.http.post<User>(this.endpoint, data);
  // }
  //
  // update(id: number, data: User): Observable<User> {
  //   return this.http.put<User>(`${this.endpoint}/${id}`, data);
  // }
  //
  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.endpoint}/${id}`);
  // }
}
