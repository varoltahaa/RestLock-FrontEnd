import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { PlaceCategory } from '../models/placeCategory';

@Injectable({
  providedIn: 'root'
})
export class PlaceCategoryServiceService {

  apiUrl = "https://localhost:44333/api/placecategory/getall"
  constructor(private httpClient:HttpClient) { }

  getPlaceCategories():Observable<ListResponseModel<PlaceCategory>>{
    return this.httpClient.get<ListResponseModel<PlaceCategory>>(this.apiUrl)
  }
}
