import { CanActivateFn } from '@angular/router';

export const roleGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
