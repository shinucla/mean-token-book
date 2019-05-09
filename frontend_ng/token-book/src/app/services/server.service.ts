import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  resolve<T>(path: string, payload: any): Observable<T> {
    return this.http.post<T>(path, payload);
  } 
}
