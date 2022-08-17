import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { MenuDetail } from 'src/app/models/menuDetail';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() name:any

  menuDetails:MenuDetail;
  menus:Menu[]=[];
  constructor(private menuService:MenuService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["placeId"]){
        this.getByMenuDetail(params["placeId"])
      }
    })
  }

  getMenu(){
    console.log()
    this.menuService.getMenu().subscribe((response)=>{
      this.menus = response.data
    })
  }

  getByMenuDetail(placeId:number){
    console.log(Number);
    this.menuService.getByMenuDetail(placeId).subscribe((response)=>{
      console.log(Number);
      this.menuDetails = response.data
    })
  }

}
