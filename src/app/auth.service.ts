import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';
import * as moment from 'moment';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<User>('http://localhost:3000/api/user/login', { username, password }).pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    );

  }

  private setSession(authResult) {
    const expiresIn = moment().add(60 * 60 * 24, 'seconds');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expiresIn', JSON.stringify(expiresIn.valueOf()));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expiresIn');
    const expiresIn = JSON.parse(expiration);
    return moment(expiresIn);
  }

  getUserId(): Observable<any> {
    return this.http.get('http://localhost:3000/api/user/id');
  }
}
