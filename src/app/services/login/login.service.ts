import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../entities/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlApi = enviroment.urlApi+ 'auth' + '/login';

  constructor (private http: HttpClient) {

   }

   loggedUser(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

   login(user: User) {
    return this.http.post<any>(this.urlApi, user);
  }



}
