import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsubscribeService {

  private unsubscribeUrl = `${environment.apiUrl}/unsubscribe`;

  constructor(
    protected http: HttpClient,
  ) { }

  public unsubscribe(token: string): Observable<any> {
    return this.http.get(`${this.unsubscribeUrl}/${token}`);
  }
}
