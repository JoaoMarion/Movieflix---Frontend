import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { Category } from '../../entities/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
  url = enviroment.urlApi + "category";

  listCategories(){
    return this.httpClient.get<Category[]>(this.url);
  }
}
