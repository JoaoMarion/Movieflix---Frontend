import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Streaming } from '../../entities/streaming';
import { enviroment } from '../../../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {

  constructor(private httpClient: HttpClient) { }
  url = enviroment.urlApi + "streaming";

  listStreamings(){
    return this.httpClient.get<Streaming[]>(this.url);
  }
}
