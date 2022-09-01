import { Time } from "@angular/common";

export interface Place{
    placeId:number;
    userId:number;
    placeCategoryId:number;
    placeName:string;
    placePhoneNumber:string
    placeAddress:string;
    openTime:Date;
    closeTime:Date;
    description:string;
    latitude:string;
    longitude:string;
}