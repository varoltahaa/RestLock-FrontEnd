import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Place } from 'src/app/models/place';
import * as L from 'leaflet';
import { PlaceService } from 'src/app/services/place.service';
import { PlaceImage } from 'src/app/models/placeImage';
import { PlaceImageService } from 'src/app/services/place-ımage.service';
import { tap } from 'rxjs';
import { LocalStoreServiceService } from 'src/app/services/local-store-service.service';

 

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
})
export class PlaceDetailComponent implements OnInit {
  
  latitude:string;
  longitude:string;
  count = 0
  map: any;
  marker: any;
  pos: string;
  currentPlaceDetails: Place;
  placeId:number = 0;
  placeImages: PlaceImage[] = [];
  email = this.localStoreService.get('email');
  constructor(
    private httpClient: HttpClient,
    private placeService: PlaceService,
    private placeImageService: PlaceImageService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private localStoreService:LocalStoreServiceService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['placeId']) {
        this.getPlaceById(params['placeId']);
        this.getImageById(params['placeId']);
      }
    });
    this.getCoords();
  }



  getPlaceById(placeId: number) {
    this.placeService.getPlaceById(placeId).subscribe((response) => {
      this.currentPlaceDetails = response.data;
      this.placeId = response.data.placeId
     let x = this.currentPlaceDetails.latitude
    let y = this.currentPlaceDetails.longitude

    let placeAddress = this.currentPlaceDetails.placeAddress
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
    });
 

    
    let map = L.map('map', {
      center: [parseInt(x) , parseInt(y)],
      zoom: 15,
    });

    
    L.marker([parseInt(x) , parseInt(y)]).bindPopup(placeAddress).addTo(map);
    

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
      }
    );



    tiles.addTo(map);
    setTimeout(() => {
      map.invalidateSize();
    }, 1);


    });
  }

  getImageById(placeId: number) {
    this.placeImageService
      .getByPlaceId(placeId)
      // .pipe(tap((response) => console.log(JSON.stringify(response))))
      .subscribe((response) => {
        this.placeImages = response.data;
      });
  }

  getCoords(){
    navigator.geolocation.getCurrentPosition(pos=>{
      this.latitude = pos.coords.latitude.toString()
     this.longitude= pos.coords.longitude.toString()
    })
}



}
