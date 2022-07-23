import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login';
import { PlaceCategory } from 'src/app/models/placeCategory';
import { PlaceImage } from 'src/app/models/placeImage';
import { User } from 'src/app/models/user';
import { LocalStoreServiceService } from 'src/app/services/local-store-service.service';
import { PlaceCategoryServiceService } from 'src/app/services/place-category-service.service';
import { PlaceImageService } from 'src/app/services/place-ımage.service';
import { PlaceService } from 'src/app/services/place.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css']
})
export class PlaceAddComponent implements OnInit {

 
  placeImage:PlaceImage[]=[];
  placeImageAddForm:FormGroup;
  placeAddForm:FormGroup;
  placeCategories:PlaceCategory[];
  logins:Login[];
  users:User[];
  email = this.localStoreService.get('email');
  
  constructor(private formBuilder:FormBuilder,private localStoreService:LocalStoreServiceService, private userService:UserService,private placeService:PlaceService, private toastrService:ToastrService, private placeCategoryService:PlaceCategoryServiceService,private placeImageService:PlaceImageService) { }

  ngOnInit(): void {
    this.createPlaceAddForm();
    this.getPlaceCategory();
  }

  createPlaceAddForm(){
    this.placeAddForm = this.formBuilder.group({
      userId:["",Validators.required],
      placeCategoryId:["",Validators.required],
      placeName:["",Validators.required],
      placePhoneNumber:["",Validators.required],
      placeAddress:["",Validators.required],
      openTime:["",Validators.required],
      closeTime:["",Validators.required],
      description:["",Validators.required]
    })
  }

  add(){
    if(this.placeAddForm.valid){
      let placeModel = Object.assign({},this.placeAddForm.value)
      this.placeService.add(placeModel).subscribe((response)=>{
      this.toastrService.success(response.message,"Başarılı");
      },responseError=>{
          
          // for (let i = 0; i < responseError.error.ValidationErrors.lenght; i++) {
         this.toastrService.error("Mekan Eklenemedi","Hata");

          // }
      })
    }
  }
  getUser(){
    this.userService.getUser().subscribe(response=>{
      this.users = response.data
    })
  }

  getPlaceCategory(){
    this.placeCategoryService.getPlaceCategories().subscribe(response=>{
      this.placeCategories = response.data
    })
  }

  checkToEmail(){
    if (localStorage.getItem('email')) 
    {
      return true;
    }else{
      return false;
    }
  }

}
