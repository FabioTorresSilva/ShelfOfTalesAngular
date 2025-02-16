import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { TokenService } from '../Services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("heyhey");
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  // Retrieve the token directly, without JSON.parse
  const token = tokenService.getToken('user_token'); 
  console.log("Token being sent:", token);
  
  if (token) {
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Use token directly
      }
    });
    return next(authRequest);
  }
  return next(req);
};