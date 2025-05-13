import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from '../../entities/userRegister';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private urlApi = enviroment.urlApi+ 'auth' + '/register';

  constructor(private http: HttpClient) {
   }

    register(user: UserRegister): Observable<any> {
    return this.http.post<any>(this.urlApi, user);
}

}
