import { HttpInterceptorFn, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError, BehaviorSubject, of } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';



let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const interceptorInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refresh_token');
  const router = inject(Router);
  const http = inject(HttpClient);
  const url = enviroment.urlApi + 'auth/refresh';

   

  let authRequest = request;

  
  if (token) {
    authRequest = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && refreshToken) {
        if (isRefreshing) {
          
          return refreshTokenSubject.pipe(
            switchMap(newToken => {
              if (newToken) {
                
                const retryRequest = request.clone({
                  headers: request.headers.set('Authorization', `Bearer ${newToken}`)
                });
                return next(retryRequest);
              }
              
              localStorage.removeItem('token');
              localStorage.removeItem('refresh_token');
              router.navigate(['/login']);
              return throwError(() => new Error('Sessão expirada'));
            })
          );
        }

        
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return http.post<any>(url, { refreshToken }).pipe(
          switchMap((res) => {
            const newToken = res.token; 
            const newRefreshToken = res.refreshToken;
            localStorage.setItem('token', newToken);
            localStorage.setItem('refresh_token', newRefreshToken);
            isRefreshing = false;
            refreshTokenSubject.next(newToken);

            
            const retryRequest = request.clone({
              headers: request.headers.set('Authorization', `Bearer ${newToken}`)
            });
            return next(retryRequest);
          }),
          catchError(() => {
            
            isRefreshing = false;
            refreshTokenSubject.next(null);
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            router.navigate(['/login']);
            return throwError(() => new Error('Sessão expirada'));
          })
        );
      }

      
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      router.navigate(['/login']);
      return throwError(() => error);
    })
  );
};