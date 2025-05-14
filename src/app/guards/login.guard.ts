import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';

export const loginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  const http = inject(HttpClient);
  const url = enviroment.urlApi + 'auth/verifyToken';

  
  if (!token) {
    return true;
  }

  
  return http.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  }).pipe(
    map(() => {
      
      router.navigate(['/home']);
      return false; 
    }),
    catchError(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      return of(true);
    })
  );
};