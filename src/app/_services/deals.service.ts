import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  url = `${environment.apiUrl}/deals`;

  constructor(
    protected http: HttpClient,
  ) { }

  public find(regionId: string, type: string): Observable<any> {
    try {
      return this._httpGet(`${this.url}/${regionId}/${type}`).pipe(
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
