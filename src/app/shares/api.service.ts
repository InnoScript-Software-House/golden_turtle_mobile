import { Injectable } from '@angular/core';

/**
 * Import services, providers and lib
 */
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public getRequest = (path: string, type?: string|null): Observable<any> => {
    const url = type === 'api' ? environment.api_url : environment.app_api;
    return this.http.get(`${url}/${path}`).pipe((map(result => result)));
  }
}
