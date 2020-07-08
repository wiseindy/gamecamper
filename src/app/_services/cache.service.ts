import { Injectable } from '@angular/core';
import { Observable, defer, isObservable, of } from 'rxjs';
import { shareReplay, first, mergeMap, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cacheRefreshTime = environment.cacheRefreshTime;

  constructor() { }

  public renewAfterTimer(obs: Observable<any>, time: number, bufferReplays: number = 1) {
    return this._createReturnObs(obs, time, bufferReplays).pipe(
      first(null, defer(
        () => {
          obs = this.renewAfterTimer(obs, this.cacheRefreshTime);
          return obs;
          // return this._createReturnObs(obs, time, bufferReplays)
        })
      ),
      mergeMap(d => (isObservable(d) ? d : of(d))),
    );
  }

  protected _createReturnObs(obs: Observable<any>, time: number, bufferReplays: number) {
    return obs.pipe(
      shareReplay(bufferReplays, time)
    );
  }
}
