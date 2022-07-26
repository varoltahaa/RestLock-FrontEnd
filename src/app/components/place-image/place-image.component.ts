import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PlaceImage } from 'src/app/models/placeImage';
import { PlaceImageService } from 'src/app/services/place-ımage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-place-image',
  templateUrl: './place-image.component.html',
  styleUrls: ['./place-image.component.css']
})
export class PlaceImageComponent implements OnInit {


  placeImage:PlaceImage[]=[];
  placeImageAddForm:FormGroup;
  constructor(private httpClient:HttpClient, private activatedRoute:ActivatedRoute, private placeImageService:PlaceImageService, private tostrService:ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {

  }

  createPlaceImageAddForm(){
    this.placeImageAddForm = this.formBuilder.group({
      imageId:["",Validators.required],
      placeId:["",Validators.required],
      imagePath:["",Validators.required],
    })
  }


  add(){
    if (this.placeImageAddForm.valid) {
      let placeImageModel = Object.assign({},this.placeImageAddForm.value)
      this.placeImageService.add(placeImageModel).subscribe((response)=>{
        this.tostrService.success(response.message,"Başarılı")

      })
    }

  }



  getPlace(){
    this.placeImageService.getPlaceImages().subscribe((response)=>{
      console.log(response)
    })
  }

}
