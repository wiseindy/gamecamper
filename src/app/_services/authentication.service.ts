import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, UpdateUser, NewUser } from '@gamecamper/_models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private theUserSubject: BehaviorSubject<User>;
  public theUser: Observable<User>;

  private userUrl = `${environment.apiUrl}/user`;
  private refreshUrl = `${this.userUrl}/refresh`;
  private loginUrl = `${this.userUrl}/login`;
  private forgotUrl = `${this.userUrl}/forgot`;

  constructor(
    protected http: HttpClient,
  ) {
    this.theUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('theUser'))
    );
    this.theUser = this.theUserSubject.asObservable();
  }

  public get theUserValue() {
    return this.theUserSubject.value;
  }

  public login(email: string, password: string) {
    return this._httpPost(this.loginUrl, {
      email,
      password,
    })
      .pipe(
        map(user => {
          localStorage.setItem('theUser', JSON.stringify(user));
          this.theUserSubject.next(user);
          return user;
        })
      );
  }

  public refresh() {
    return this._httpPost(this.refreshUrl, '')
      .pipe(
        map(user => {
          localStorage.setItem('theUser', JSON.stringify(user));
          this.theUserSubject.next(user);
          return user;
        })
      );
  }

  public logout() {
    localStorage.removeItem('theUser');
    this.theUserSubject.next(null);
  }

  public delete() {
    return this._httpDelete(this.userUrl)
      .pipe(
        map(() => {
          this.logout();
          return;
        })
      );
  }

  public register(newUser: NewUser) {
    return this._httpPost(this.userUrl, newUser)
      .pipe(
        map(user => {
          localStorage.setItem('theUser', JSON.stringify(user));
          this.theUserSubject.next(user);
          return user;
        })
      );
  }

  public forgot(email: string) {
    return this._httpPost(this.forgotUrl, {
      email,
    });
  }

  public update(user: UpdateUser) {
    return this._httpPut(this.userUrl, user)
      .pipe(
        map(updatedUser => {
          if (updatedUser.token) {
            localStorage.setItem('theUser', JSON.stringify(updatedUser));
            this.theUserSubject.next(updatedUser);
            return updatedUser;
          }
        })
      );
  }

  protected _httpPost(url: string, body: any) {
    return this.http.post<any>(url, body);
  }

  protected _httpPut(url: string, body: any) {
    return this.http.put<any>(url, body);
  }

  protected _httpDelete(url: string) {
    return this.http.delete<any>(url);
  }
}
