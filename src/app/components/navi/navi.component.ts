import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStoreServiceService } from 'src/app/services/local-store-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {


  email = this.localStoreService.get('email');
  users:User;
  
  constructor(private authService:AuthService,private localStoreService:LocalStoreServiceService, private toastrService: ToastrService, private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.checkToEmail();
    this.checkToLogin();
    this.getEmail();
  }


  checkToLogin(){
    if (this.authService.isAuthenticated()) {
      return true
    }else{
      return false
    }
  }

  checkToEmail(){
    if (localStorage.getItem('email')) 
    {
      return true;
    }else{
      return false;
    }
  }


  getEmail(){
    if (this.email) {
      
      this.userService.getByMail(this.email).subscribe(response => {
        this.users = response.data;
        
      })
    }
  }



  logOut(){
    this.localStoreService.clean();
    this.toastrService.info("Çıkış Yapıldı","Başarılı")
  }
}
