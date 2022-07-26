import { Time } from "@angular/common";
import { PlaceImage } from "./placeImage";

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