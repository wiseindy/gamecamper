import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewWatchlist, UpdateWatchlist } from '@gamecamper/_models';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private theWatchlistSubject: Subject<any>;
  public theWatchlist: Observable<any>;
  private watchlist = `${environment.apiUrl}/watchlist`;

  constructor(
    protected http: HttpClient,
  ) {
    this.theWatchlistSubject = new Subject<any>();
    this.theWatchlist = this.theWatchlistSubject.asObservable();
  }

  public get() {
    return this.http.get(this.watchlist)
    .pipe(
      map(watchlist => {
        this.theWatchlistSubject.next(watchlist);
        return watchlist;
      })
    );
  }

  public add(data: NewWatchlist) {
    return this.http.post(`${this.watchlist}`, data)
    .pipe(
      map(() => {
        this.get().subscribe();
      })
    );
  }

  public update(id: string, data: UpdateWatchlist) {
    return this.http.put(`${this.watchlist}/${id}`, data)
    .pipe(
      map(() => {
        this.get().subscribe();
      })
    );
  }

  public delete(id: string) {
    return this.http.delete(`${this.watchlist}/${id}`)
    .pipe(
      map(() => {
        this.get().subscribe();
      })
    );
  }
}
