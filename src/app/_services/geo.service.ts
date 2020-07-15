import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  private defaultRegion = 'us';
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
    if (!this.theGeoValue) {
      this.detect().subscribe(x => {
        this.setGeo(x);
      });
    }
  }

  public get theGeoValue() {
    return this.theGeoSubject.value;
  }

  public detect() {
    return this.http.get(this.urlDetect).pipe(
      catchError(error => {
        return of({
          region: this.defaultRegion
        });
      })
    );
  }

  public switchRegion(region) {
    this.setGeo(region);
  }

  public get(): Observable<any> {
    return this.http.get(this.urlGet).pipe(
      catchError(error => {
        return of([this.defaultRegion]);
      })
    );
  }

  private setGeo(geo) {
    localStorage.setItem('theGeo', JSON.stringify(geo));
    this.theGeoSubject.next(geo);
    return geo;
  }
}
