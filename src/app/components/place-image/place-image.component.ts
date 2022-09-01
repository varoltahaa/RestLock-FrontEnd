import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PlaceImage } from 'src/app/models/placeImage';
import { PlaceImageService } from 'src/app/services/place-ımage.service';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from 'src/app/services/place.service';
import { Place } from 'src/app/models/place';
import { LocalStoreServiceService } from 'src/app/services/local-store-service.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-place-image',
  templateUrl: './place-image.component.html',
  styleUrls: ['./place-image.component.css']
})
export class PlaceImageComponent implements OnInit {


  place:Place[]=[]
  placeImage:PlaceImage[]=[];
  placeImageAddForm:FormGroup;
  fileToUpload:File 
  user:User
  userId:number
  email = this.localStoreService.get('email');

  constructor(private httpClient:HttpClient, private userService:UserService ,private localStoreService:LocalStoreServiceService, private activatedRoute:ActivatedRoute,private placeService:PlaceService , private placeImageService:PlaceImageService, private tostrService:ToastrService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createPlaceImageAddForm();
    this.getEmail();
  }

  createPlaceImageAddForm(){
    this.placeImageAddForm = this.formBuilder.group({
      placeId:["",Validators.required],
      imagePath:["",Validators.required],
    })
  }


  handleFileInput(event:any) {
    this.fileToUpload = event.target.files[0];
}

 uploadFileToActivity() {
   let placeImageModel = Object.assign({},this.placeImageAddForm.value)
   this.placeImageService.add(this.fileToUpload,placeImageModel.placeId).subscribe(data => 
     {

    }, error => {
       console.log(error);
    });
}



  getPlace(){
    this.placeImageService.getPlaceImages().subscribe((response)=>{
      console.log(response)
    })
  }

  getPlaceByUserId(userId:number){
    this.placeService.getPlaceByUserId(userId).subscribe((response)=>{
      this.place = response.data
    })
  }



  getEmail(){
    if (this.email) {
      this.userService.getByMail(this.email).subscribe(response => {
        this.user = response.data;
        this.getPlaceByUserId(this.user.userId)
      })
    }
  }

}
