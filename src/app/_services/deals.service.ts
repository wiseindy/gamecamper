import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  private url = `${environment.apiUrl}/deals`;
  private url1 = `${environment.apiUrl}/games/range/1`;
  private url5 = `${environment.apiUrl}/games/range/5`;
  private url10 = `${environment.apiUrl}/games/range/10`;
  private cache: Observable<Array<any>>[] = [];
  private cache1: Observable<Array<any>>[] = [];
  private cache5: Observable<Array<any>>[] = [];
  private cache10: Observable<Array<any>>[] = [];
  private cacheRefreshTime = environment.cacheRefreshTime;

  constructor(
    protected http: HttpClient,
    protected readonly cacheService: CacheService,
  ) { }

  public find(regionId: string, type: string): Observable<any> {
    try {
      const key = `${regionId}_${type}`;
      if (!this.cache[key]) {
        const obs = this.httpGet(`${this.url}/${regionId}/${type}`);
        this.cache[key] = this.cacheService.renewAfterTimer(obs, this.cacheRefreshTime);
      }
      return this.cache[key];
    } catch (error) {
      return of(null);
    }
  }

  public find1(regionId: string, page: number = 1): Observable<any> {
    if (page < 1) {
      page = 1;
    }
    const newUrl = `${this.url1}/${regionId}/${page}`;
    try {
      // return this.http.get(newUrl);
      const key = `${regionId}_p${page}`;
      if (!this.cache1[key]) {
        const obs = this.httpGet(newUrl);
        this.cache1[key] = this.cacheService.renewAfterTimer(obs, this.cacheRefreshTime);
      }
      return this.cache1[key];
    } catch (error) {
      return of(null);
    }
  }

  public find5(regionId: string, page: number = 1): Observable<any> {
    if (page < 1) {
      page = 1;
    }
    const newUrl = `${this.url5}/${regionId}/${page}`;
    try {
      const key = `${regionId}_p${page}`;
      if (!this.cache5[key]) {
        const obs = this.httpGet(newUrl);
        this.cache5[key] = this.cacheService.renewAfterTimer(obs, this.cacheRefreshTime);
      }
      return this.cache5[key];
    } catch (error) {
      return of(null);
    }
  }

  public find10(regionId: string, page: number = 1): Observable<any> {
    if (page < 1) {
      page = 1;
    }
    const newUrl = `${this.url10}/${regionId}/${page}`;
    try {
      const key = `${regionId}_p${page}`;
      if (!this.cache10[key]) {
        const obs = this.httpGet(newUrl);
        this.cache10[key] = this.cacheService.renewAfterTimer(obs, this.cacheRefreshTime);
      }
      return this.cache10[key];
    } catch (error) {
      return of(null);
    }
  }

  protected httpGet(url: string) {
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
