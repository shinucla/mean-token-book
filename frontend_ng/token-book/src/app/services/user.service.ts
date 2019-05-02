import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: AuthService) { }

  isLoggedIn(): boolean {
    return false;
  }
}
/*
auth service:
 - manage authentication
 - sessions
 - login
 - logout
 - register
 -

user service: providing methods for getting setting user infos



*/
