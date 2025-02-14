import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('user'); 

  if (isAuthenticated) {
    router.navigate(['/']); 
    return false;
  }

  return true;
};
