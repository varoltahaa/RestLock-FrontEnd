import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ListResponseModel, ObjectResponseModel } from '../models/listResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44333/api/"
  constructor(private httpClient:HttpClient) { }


  getUser():Observable<ListResponseModel<User>>{
    let newPath = this.apiUrl+"users/getall"
    return this.httpClient.get<ListResponseModel<User>>(newPath)
  }

  getByMail(email:string):Observable<ObjectResponseModel<User>>{
    let newPath = this.apiUrl + "users/getmail?email="+email
    return this.httpClient.get<ObjectResponseModel<User>>(newPath)
  }
}
