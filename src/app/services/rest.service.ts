import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {
  abstract get endpoint(): string;

  constructor(protected http: HttpClient) { }

  all(page?: number): Observable<any> {
    let url = this.endpoint;
    if (page) { // page is optional
      url += `?page=${page}`;
    }

    return this.http.get(url);
    // return this.http.get(`${this.endpoint}?page=${page}`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.endpoint, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
