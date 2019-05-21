import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any>; // make subject so we can subscribe, make it behavior so we get the latest version

  constructor(private server: ServerService) {
    // try to load user from local storage
    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
  }

  public getUserObservable(): Observable<any> {
    return this.userSubject.asObservable();
  }

  public getUserValue(): any {
    return this.userSubject.value;
  }

  register(user) {
    return this.server.resolve<any>('/api/user/signupParent', user);
  }

  registerChild(user) {
    return this.server.resolve<any>('/api/user/signupChild', user);
  }

  login(user) {
    return this.server
      .resolve<any>('/api/user/login', user)
      .pipe(map(data => {
        let user = data.user;
        let jwt = data.jwt;

        if (user && jwt) {
          user.jwt = jwt;
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }

        return user
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  updateUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }
}
