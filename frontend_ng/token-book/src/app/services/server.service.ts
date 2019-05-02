import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  resolve<T>(path: string, payload: any): Observable<T> {
    var jwt = localStorage.getItem('jwt');
    console.log(jwt);
    return this.http.post<T>(path,
			     payload
			     //,
			     //{ headers: new HttpHeaders({
			     //  'Content-Type': 'application/json',
			     //  'jwt': null == jwt ? null : jwt
			     //}) }
			    );
  } 
}
