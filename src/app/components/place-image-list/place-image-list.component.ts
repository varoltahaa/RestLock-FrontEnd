import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaceImage } from 'src/app/models/placeImage';
import { PlaceImageService } from 'src/app/services/place-ımage.service';

@Component({
  selector: 'app-place-image-list',
  templateUrl: './place-image-list.component.html',
  styleUrls: ['./place-image-list.component.css']
})
export class PlaceImageListComponent implements OnInit {

  placeImages: PlaceImage[] = [];
  constructor(private placeImageService: PlaceImageService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      if (params['placeId']) {
        this.getImageById(params['placeId']);
      }
    });
  }

  getImageById(placeId: number) {
    this.placeImageService
      .getByPlaceId(placeId)
      .subscribe((response) => {
        this.placeImages = response.data;
      });
  }
}
