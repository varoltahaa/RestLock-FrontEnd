import { ResponseModel } from "./responseModel";

export interface ListResponseModel<T> extends ResponseModel{
    data:T[];
}

export interface ObjectResponseModel<T> extends ResponseModel{
    data:T;
}