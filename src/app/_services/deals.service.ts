import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  private url = `${environment.apiUrl}/deals`;
  private cache: Observable<Array<any>>[] = [];
  private cacheRefreshTime = environment.cacheRefreshTime;

  constructor(
    protected http: HttpClient,
    protected readonly cacheService: CacheService,
  ) { }

  public find(regionId: string, type: string): Observable<any> {
    try {
      if (!this.cache[type]) {
        const obs = this._httpGet(`${this.url}/${regionId}/${type}`);
        this.cache[type] = this.cacheService.renewAfterTimer(obs, this.cacheRefreshTime);
      }
      return this.cache[type];
    } catch (error) {
      return of(null);
    }
  }

  protected _httpGet(url: string) {
    // return this.http.get(`${url}`);
    return this.http.get(url).pipe(
      catchError(error => {
        if (error === 'Unknown Error') {
          return of(-1);
        } else {
          return of(null);
        }
      })
    );
  }
}
