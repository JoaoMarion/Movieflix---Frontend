import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpclient: HttpClient) { }
  url = enviroment.urlApi + "/movies";

  
}
