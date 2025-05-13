import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token');
  const router = inject(Router);
  const http = inject(HttpClient);
  const url = enviroment.urlApi+ 'auth' + '/verifyToken';


   if (!token) {
    router.navigate(['/login']);
    return false;
   }

  
   return http.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  }).pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
