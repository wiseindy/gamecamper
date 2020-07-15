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
  private resetUrl = `${this.userUrl}/reset`;

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
    return this.httpPost(this.loginUrl, {
      email,
      password,
    })
      .pipe(
        map(user => {
          return this.loginUser(user);
        })
      );
  }

  public refresh() {
    return this.httpPost(this.refreshUrl, '')
      .pipe(
        map(user => {
          return this.loginUser(user);
        })
      );
  }

  public logout() {
    localStorage.removeItem('theUser');
    this.theUserSubject.next(null);
  }

  public delete() {
    return this.httpDelete(this.userUrl)
      .pipe(
        map(() => {
          this.logout();
          return;
        })
      );
  }

  public register(newUser: NewUser) {
    return this.httpPost(this.userUrl, newUser)
      .pipe(
        map(user => {
          return this.loginUser(user);
        })
      );
  }

  public forgot(email: string) {
    return this.httpPost(this.forgotUrl, {
      email,
    });
  }

  public reset(token: string, password: string) {
    return this.httpPost(this.resetUrl, {
      token,
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

  public update(user: UpdateUser) {
    return this.httpPut(this.userUrl, user)
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

  protected httpPost(url: string, body: any) {
    return this.http.post<any>(url, body);
  }

  protected httpPut(url: string, body: any) {
    return this.http.put<any>(url, body);
  }

  protected httpDelete(url: string) {
    return this.http.delete<any>(url);
  }

  protected loginUser(user) {
    localStorage.setItem('theUser', JSON.stringify(user));
    this.theUserSubject.next(user);
    return user;
  }
}
