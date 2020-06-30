import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  games = `${environment.apiUrl}/games`;
  game = `${environment.apiUrl}/game`;

  constructor(
    protected http: HttpClient,
  ) { }

  public find(regionId: string, games: Observable<string>): Observable<any> {
    return games.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(game => {
        if (game.length > 2) {
          try {
            return this._httpGet(`${this.games}/${regionId}/${game}`).pipe(
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
        } else {
          return of(null);
        }
      }
      )
    );
  }

  public findOne(regionId: string, gameId: string): Observable<any> {
    return this._httpGet(`${this.game}/${regionId}/${gameId}`);
  }

  protected _httpGet(url: string) {
    return this.http.get(`${url}`);
  }
}
