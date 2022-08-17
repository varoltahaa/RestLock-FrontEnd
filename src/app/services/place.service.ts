import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel, ObjectResponseModel } from '../models/listResponseModel';
import { Place } from '../models/place';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  apiUrl = "https://localhost:44333/api/"
  constructor(private httpClient:HttpClient) { }


  getPlaces():Observable<ListResponseModel<Place>>{
    let newPath = this.apiUrl+"places/getall"
    return this.httpClient.get<ListResponseModel<Place>>(newPath) // gelen datayı PlaceResponseModel'e map edeceğimizi tanımlarız burada generic yapıyı vererek
  }

  getPlaceById(placeId:number){
    let newPath = this.apiUrl + "places/getbyid?placeId="+placeId
    return this.httpClient.get<ObjectResponseModel<Place>>(newPath)
  }

  
  getAllByCategoryId(placeCategoryId:number):Observable<ListResponseModel<Place>>{
    let newPath = this.apiUrl + "places/getallbycategoryid?categoryId="+placeCategoryId
    return this.httpClient.get<ListResponseModel<Place>>(newPath)
  }

  getPlaceByUserId(userId:number):Observable<ListResponseModel<Place>>{
    let newPath = this.apiUrl + "places/getplacebyuserid?userId="+userId
    return this.httpClient.get<ListResponseModel<Place>>(newPath)
  }

  add(place:Place):Observable<ResponseModel>{
    let newPath = this.apiUrl+"places/add"
    return this.httpClient.post<ResponseModel>(newPath,place)
  }

  
}
