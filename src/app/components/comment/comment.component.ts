import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comments } from 'src/app/models/comments';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommentServiceService } from 'src/app/services/comment-service.service';
import { Place } from 'src/app/models/place';
import { LocalStoreServiceService } from 'src/app/services/local-store-service.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() placeId:number;

  likeCount=0;
  isLiked = false;
  users:User
  place:Place
  comment:Comments[]=[]
  commentAddForm:FormGroup;
  email = this.localStoreService.get('email');
  constructor(private commentService:CommentServiceService,private placeService:PlaceService, private userService:UserService, private localStoreService:LocalStoreServiceService , private activatedRoute: ActivatedRoute,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params['placeId']){
        this.getByPlaceId(params['placeId']);
      } 
    })
    this.createCommentAddForm();
    this.getEmail();
  }

  likeTheButton = () => {
    if(this.isLiked)
    this.likeCount--;
    else
    this.likeCount++;

    this.isLiked = !this.isLiked
  }


  createCommentAddForm(){
    this.commentAddForm = this.formBuilder.group({
      placeId:["",Validators.required],
      userName:["",Validators.required],
      eMail:["",Validators.required],
      comments:["",Validators.required]
    })
  }

  getByPlaceId(placeId:number){
    this.commentService.getByPlaceId(placeId).subscribe((response)=>{
      this.comment = response.data
    })
  }

  getEmail(){
    if (this.email) {
      
      this.userService.getByMail(this.email).subscribe(response => {
        this.users = response.data;
        
      })
    }
  }

  setUserId(){
    this.commentAddForm.controls['userName'].setValue(this.users?.firstName+" "+this.users?.lastName)
    this.commentAddForm.controls['eMail'].setValue(this.users?.email);
  }





  add(){
    if (this.commentAddForm.valid) {
      let commentModel = Object.assign({},this.commentAddForm.value)
      this.commentService.add(commentModel).subscribe((response)=>{})
      setTimeout(()=>{window.location.reload();},1)
    }
  }

}
