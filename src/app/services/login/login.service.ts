import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../entities/user';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlApi = enviroment.urlApi+ 'auth' + '/login';

  constructor (private http: HttpClient, private router: Router) {

   }

   loggedUser(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

   login(user: User) {
    return this.http.post<any>(this.urlApi, user);
  }

  logout():void{

   const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.remove();
  }

    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
    
  }



}
