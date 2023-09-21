import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private autSrv: AuthService, private router: Router, private userService: UserService) { }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      if (this.autSrv.isLoggedIn()) {
          return true;
      }
      alert('Per visualizzare questa risorsa devi essere loggato!\nAccedi o registrati');
      return this.router.createUrlTree(['/login']);
  }
}

