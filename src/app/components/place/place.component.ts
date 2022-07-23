import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/models/place';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  places:Place[] = [];

  dataLoaded = false;
  constructor(private placeService:PlaceService) { }

  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces(){
    this.placeService.getPlaces().subscribe(response => {
      this.places = response.data
      this.dataLoaded = true;
    })
  }

}
