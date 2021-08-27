import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(protected http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${environment.api}/login`, data); // withCredentials is set in interceptors file
    // return this.http.post(`${environment.api}/login`, data, {
    //   withCredentials: true,
    // });
  }

  register(data: any): Observable<User> {
    return this.http.post<User>(`${environment.api}/register`, data);
  }

  user(): Observable<User> {
    return this.http.get<User>(`${environment.api}/user`); // withCredentials true
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${environment.api}/logout`, {}); // withCredentials option will remove jwt from the browser
  }

  updateInfo(data: any): Observable<User> {
    return this.http.post<User>(`${environment.api}/users/info`, data);
  }

  updatePassword(data: any): Observable<User> {
    return this.http.post<User>(`${environment.api}/users/password`, data);
  }
}
