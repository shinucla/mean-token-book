import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const RoleEnum = {
  PARENT: 1,
  CHILD: 2,
  ADMIN: 4,
};

@Injectable({
  providedIn: 'root'
})
export class ParentGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | UrlTree {
    let canActivate: boolean = 0 < (RoleEnum.PARENT & this.auth.getUserValue().role_id);

    if (canActivate) return true;
    
    this.router.navigate(['/home']);
    return false;
  }

}
