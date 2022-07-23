import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Place } from 'src/app/models/place';
import * as L from 'leaflet';
import { PlaceService } from 'src/app/services/place.service';
import { PlaceImage } from 'src/app/models/placeImage';
import { PlaceImageService } from 'src/app/services/place-ımage.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {

  map:any;
  marker:any;
  pos:string;
  currentPlaceDetails:Place;
  placeImages:PlaceImage[]=[]
  constructor(private httpClient:HttpClient,private placeService:PlaceService, private placeImageService:PlaceImageService ,private toastrService:ToastrService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      console.log(params)
      if (params["placeId"]) {
        this.getPlaceById(params["placeId"])
        this.getImageById(params["placeId"])
      }
       
    })
    this.getLocation();
   
  }



  

  getLocation()
  
  {
    if ( navigator.geolocation ){
      navigator.geolocation.getCurrentPosition(function(pos){
        let latitude= pos.coords.latitude  
        let longitude= pos.coords.longitude

        
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1});
         let map = L.map('map', {
          center: [latitude, longitude],
          zoom: 8,
        });
        L.marker([latitude, longitude]).bindPopup("").addTo(map);
        
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 3
        }); 
        tiles.addTo(map);
        setTimeout(() => {
          map.invalidateSize()
    
        },1);
        
      });
    } else {
      this.toastrService.error("Tarayıcınız bu özelliği desteklemiyor","Başarısız")
    }
  }





  

  getPlaceById(placeId:number){
    this.placeService.getPlaceById(placeId).subscribe(response=>{
      this.currentPlaceDetails = response.data
    })
  }

  getImageById(placeId:number){
    this.placeImageService.getByPlaceId(placeId).subscribe((response)=>{

      this.placeImages = response.data
      console.log(response)
    })
  }

  

}
