import { Time } from "@angular/common";

export interface Place{
    placeId:number;
    userId:number;
    placeCategoryId:number;
    placeName:string;
    placePhoneNumber:string
    placeAddress:string;
    openTime:Time;
    closeTime:Time;
    description:string;
}