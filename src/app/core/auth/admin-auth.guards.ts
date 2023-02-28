import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, switchMap, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private authService = inject(AuthService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<UrlTree> | UrlTree {
    return this.authService.auth$.pipe(
      map(
        (user) => user.role === 'admin' && this.authService.getConfirm().hasAuth
      ),
      map((isAdmin) => {
        if (!isAdmin) {
          this.authService.handleNoAuthState;
        }
        return isAdmin;
      })
    );
  }
}
