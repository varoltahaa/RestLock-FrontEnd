import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ListResponseModel,
  ObjectResponseModel,
} from '../models/listResponseModel';
import { PlaceImage } from '../models/placeImage';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PlaceImageService {
  apiUrl = 'https://localhost:44333/api/';
  constructor(private httpClient: HttpClient) {}

  add(fileToUpload: File,placeId:number): Observable<boolean> {
    const endpoint = 'https://localhost:44333/api/PlaceImages/add';
    const formData: FormData = new FormData();
    formData.append('placeId',placeId.toString())
    formData.append('file', fileToUpload);
    formData.append('imagePath',fileToUpload.name);
    let newPath = this.apiUrl + 'PlaceImages/add';
    return this.httpClient.post<boolean>(endpoint, formData);
  }

  getPlaceImages(): Observable<ListResponseModel<PlaceImage>> {
    let newPath = this.apiUrl + 'PlaceImages/getall';
    return this.httpClient.get<ListResponseModel<PlaceImage>>(newPath);
  }

  getByPlaceId(placeId: number): Observable<ListResponseModel<PlaceImage>> {
    let newPath = this.apiUrl + 'PlaceImages/getbyplaceid?placeId=' + placeId;
    return this.httpClient.get<ListResponseModel<PlaceImage>>(newPath);
  }
}
