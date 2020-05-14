import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorSubject: Subject<string>;
  public error: Observable<string>;

  constructor() {
    this.errorSubject = new Subject<string>();
    this.error = this.errorSubject.asObservable();
  }

  public add(error: string) {
    this.errorSubject.next(error);
  }

  public clear() {
    this.errorSubject.next(null);
  }
}
