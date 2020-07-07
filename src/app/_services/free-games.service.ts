import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FreeGamesService {

  url = `${environment.apiUrl}/games/free`;

  constructor(
    protected http: HttpClient,
  ) { }

  public find(all: boolean = false): Observable<any> {
    let newUrl = this.url;
    if (all) {
      newUrl = `${this.url}/all`;
    }
    try {
      return this._httpGet(`${newUrl}`).pipe(
        catchError(error => {
          if (error === 'Unknown Error') {
            return of(-1);
          } else {
            return of(null);
          }
        })
      );
    } catch (error) {
      return of(null);
    }
  }

  protected _httpGet(url: string) {
    return this.http.get(`${url}`);
  }
}
