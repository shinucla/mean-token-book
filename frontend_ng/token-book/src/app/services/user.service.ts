import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: AuthService,
	      private server: ServerService) { }

  isLoggedIn(): boolean {
    return null !== this.auth.getUserValue();
  }

  getChildren() {
    return this.server.resolve('/api/user/getChildren', {});
  }

  getFamilyMembers() {
    return this.server.resolve('/api/user/getFamilyMembers', {});
  }

  createFamily(json) {
    return this.server.resolve('/api/user/createFamily', json);
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
