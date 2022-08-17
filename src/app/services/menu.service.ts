import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel,ObjectResponseModel } from '../models/listResponseModel';
import { Menu } from '../models/menu';
import { MenuDetail } from '../models/menuDetail';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  apiUrl = "https://localhost:44333/api/"
  constructor(private httpClient:HttpClient) { }


  getMenu():Observable<ListResponseModel<Menu>>{
    let newPath = this.apiUrl +"Menus/getall"
    return this.httpClient.get<ListResponseModel<Menu>>(newPath)
}

  getByMenuDetail(placeId:number):Observable<ObjectResponseModel<MenuDetail>>{
    let newPath = this.apiUrl + "Menus/getbymenudetail?placeId="+placeId
    return this.httpClient.get<ObjectResponseModel<MenuDetail>>(newPath)
  }

}
