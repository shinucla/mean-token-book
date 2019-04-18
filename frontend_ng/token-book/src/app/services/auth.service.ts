import { Injectable } from '@angular/core';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private server: ServerService) { }

  login(user) {
    this.server.post('/api/user/login', user).subscribe(data => {
      localStorage.setItem('jwt', data.jwt);
    });
  }
}
