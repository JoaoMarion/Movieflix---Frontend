import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyCodeService {

  private urlApi = enviroment.urlApi+ 'auth' + '/verify';

  constructor(private http: HttpClient) {}

  verifyCode(code: number): Observable<any>{
    return this.http.post<any>(this.urlApi, { code });
  }
}
