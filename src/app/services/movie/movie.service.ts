import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../../entities/movie';
import { map, Observable } from 'rxjs';
import { Category } from '../../entities/category';
import { Streaming } from '../../entities/streaming';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }
  url = enviroment.urlApi + "movie";

 listMovies() {
  return this.httpClient.get<Movie[]>(this.url);
}


  
}
