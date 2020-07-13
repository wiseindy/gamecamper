import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable, BehaviorSubject } from 'rxjs';

const DEFAULT_REGION = 'ca';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  private theGeoSubject: BehaviorSubject<any>;
  public theGeo: Observable<any>;

  private urlDetect = `${environment.apiUrl}/geo/detect`;
  private urlGet = `${environment.apiUrl}/geo/get`;

  constructor(
    protected readonly http: HttpClient
  ) {
    this.theGeoSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('theGeo'))
    );
    this.theGeo = this.theGeoSubject.asObservable();
    this.detect().subscribe(x => {
      this._setGeo(x);
    });
  }

  public get theGeoValue() {
    return this.theGeoSubject.value;
  }

  public detect() {
    return this.http.get(this.urlDetect).pipe(
      catchError(error => {
        return of({
          region: DEFAULT_REGION
        });
      })
    );
  }

  public get(): Observable<any> {
    return this.http.get(this.urlGet).pipe(
      catchError(error => {
        return of([DEFAULT_REGION.toUpperCase()]);
      })
    );
  }

  private _setGeo(geo) {
    localStorage.setItem('theGeo', JSON.stringify(geo));
    this.theGeoSubject.next(geo);
    return geo;
  }
}
