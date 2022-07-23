import { Component, OnInit } from '@angular/core';
import { PlaceCategory } from 'src/app/models/placeCategory';
import { PlaceCategoryServiceService } from 'src/app/services/place-category-service.service';

@Component({
  selector: 'app-place-category',
  templateUrl: './place-category.component.html',
  styleUrls: ['./place-category.component.css']
})
export class PlaceCategoryComponent implements OnInit {

  constructor(private placeCategoryService:PlaceCategoryServiceService) { }

  placeCategories:PlaceCategory[] =[]
  currentPlaceCategory:PlaceCategory;
  ngOnInit(): void {
    this.getPlaceCategory();
  }

  getPlaceCategory(){
    this.placeCategoryService.getPlaceCategories().subscribe((response)=>{
      this.placeCategories = response.data
    })
  }

  setCurrentPlaceCategory(placeCategories:PlaceCategory){
    this.currentPlaceCategory=placeCategories
  }

  getCurrentPlaceCategoryClass(placeCategories:PlaceCategory){
    if(placeCategories==this.currentPlaceCategory){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

}
