import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  private validateUrl = `${environment.apiUrl}/validate`;

  constructor(
    protected http: HttpClient,
  ) { }

  public validate(token: string): Observable<any> {
    return this.http.get(`${this.validateUrl}/${token}`);
  }

  public resend(): Observable<any> {
    return this.http.post(`${this.validateUrl}`, '');
  }
}
