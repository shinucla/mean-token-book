import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  post<T>(path, payload): Observable<T> {
    return this.http.post<T>(path,
			     payload,
			     { headers: new HttpHeaders({
			       'Content-Type': 'application/json',
			       'jwt': localStorage.getItem('jwt')
			     }) });
  } 
}
