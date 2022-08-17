import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../models/comments';
import { ListResponseModel, ObjectResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  apiUrl = "https://localhost:44333/api/"
  constructor(private httpClient:HttpClient) { }

  getComments():Observable<ListResponseModel<Comments>>{
    let newPath = this.apiUrl+"Comments/getall"
    return this.httpClient.get<ListResponseModel<Comments>>(newPath) 
  }

  getByPlaceId(placeId:number){
    let newPath = this.apiUrl + "Comments/getbyplaceid?id="+placeId
    return this.httpClient.get<ListResponseModel<Comments>>(newPath)
  }

  add(comment:Comments):Observable<ResponseModel>{
    let newPath = this.apiUrl+"Comments/add"
    return this.httpClient.post<ResponseModel>(newPath,comment)
  }
}
