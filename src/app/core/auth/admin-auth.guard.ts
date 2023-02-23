import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { tap, map } from 'rxjs';
import { AuthService } from './auth.service';

export const adminAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.confirm$.pipe(
    tap((authState) => {
      if (authState.hasAuth) return;

      authService.handleNoAuthState();
    }),
    map((authState) => authState.hasAuth)
  );
};
