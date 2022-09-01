import { Component, OnInit } from '@angular/core';
import { Comments } from 'src/app/models/comments';
import { CommentServiceService } from 'src/app/services/comment-service.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {


  comment:Comments[]=[]
  constructor(private commentService:CommentServiceService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.commentService.getComments().subscribe((response)=>{
      this.comment = response.data
    })
  }

  delete(comment:Comments){
    this.commentService.delete(comment).subscribe((response)=>{
    })
    setTimeout(() => { window.location.reload(); }, 2000); 
  }

}
