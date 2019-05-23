import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  resolve<T>(path: string, payload: any): Observable<T> {
    return (this.http
	    .post<T>(path, payload)
	    .pipe(
	      map(x => x['data']), // TODO: what if there is error?
	      take(1)              // will automatically unsubscribe after first execution
	    ));
  }
}
