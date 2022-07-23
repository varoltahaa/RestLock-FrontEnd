import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  filterText="";

  constructor(private placeService:PlaceService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["categoryId"]){
        this.getAllByCategoryId(params["categoryId"])
      }
      else{
        this.getPlaces();
      }
    })

  }

  getPlaces(){
    this.placeService.getPlaces().subscribe(response => {
      this.places = response.data
      this.dataLoaded = true;
    })
  }


  getAllByCategoryId(placeCategoryId:number){
    this.placeService.getAllByCategoryId(placeCategoryId).subscribe(response => {
      this.places = response.data
      this.dataLoaded = true;
    })
  }


}
