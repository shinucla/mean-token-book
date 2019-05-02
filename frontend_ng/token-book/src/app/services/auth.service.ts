import { Injectable } from '@angular/core';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private server: ServerService) { }

  login(user) {
    this.server
      .resolve<any>('/api/user/login', user)
      .subscribe(data => {
	console.log(data);
	localStorage.setItem('jwt', data.data.jwt);
      });
  }
}
