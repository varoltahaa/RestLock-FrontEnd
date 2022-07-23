import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Place } from '../models/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  apiUrl = "https://localhost:44333/api/places/getall"
  constructor(private httpClient:HttpClient) { }


  getPlaces():Observable<ListResponseModel<Place>>{
    return this.httpClient.get<ListResponseModel<Place>>(this.apiUrl) // gelen datayı PlaceResponseModel'e map edeceğimizi tanımlarız burada generic yapıyı vererek
  }
}
