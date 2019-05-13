import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  //@Override
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add authorization header with jwt token if available
    let user = this.auth.getUserValue();
    
    if (user && user.jwt) {
      //request = request.clone({ setHeaders: { Authorization: `jwt ${user.jwt}` }});
      request = request.clone({ setHeaders: { jwt: user.jwt }});
    }
    
    return next.handle(request);
  }
}
