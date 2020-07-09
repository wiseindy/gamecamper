import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, defer, isObservable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, shareReplay, first, mergeMap, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class FreeGamesService {

  private url = `${environment.apiUrl}/games/free`;
  private url0 = `${environment.apiUrl}/games/range/0`;
  private cacheRefreshTime = environment.cacheRefreshTime;
  private cache: Observable<Array<any>>[] = [];
  private cache0$: Observable<Array<any>>;

  constructor(
    protected readonly http: HttpClient,
    protected readonly cacheService: CacheService,
  ) { }

  public findReddit(all: boolean = false): Observable<any> {
    let type = 'few';
    let newUrl = this.url;
    if (all) {
      type = 'all';
      newUrl = `${this.url}/all`;
    }
    try {
      if (!this.cache[type]) {
        const obs = this._httpGet(newUrl);
        this.cache[type] = this.cacheService.renewAfterTimer(obs, this.cacheRefreshTime);
      }
      return this.cache[type];
    } catch (error) {
      return of(null);
    }
  }

  public find0(regionId: string, page: number = 1): Observable<any> {
    if (page < 1) {
      page = 1;
    }
    const newUrl = `${this.url0}/${regionId}/${page}`;
    try {
      if (!this.cache0$) {
        const obs = this._httpGet(newUrl);
        this.cache0$ = this.cacheService.renewAfterTimer(obs, this.cacheRefreshTime);
      }
      return this.cache0$;
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
