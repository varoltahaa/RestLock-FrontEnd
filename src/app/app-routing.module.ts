import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { PlaceAddComponent } from './components/place-add/place-add.component';
import { PlaceDetailComponent } from './components/place-detail/place-detail.component';
import { PlaceImageComponent } from './components/place-image/place-image.component';
import { PlaceComponent } from './components/place/place.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomePageComponent},
  {path:"places",component:PlaceComponent, canActivate:[LoginGuard]},
  {path:"places/placeCategory/:categoryId",component:PlaceComponent, canActivate:[LoginGuard]},
  {path:"places/placeCategory/:categoryId/placedetail/:placeId",component:PlaceDetailComponent, canActivate:[LoginGuard]},
  {path:"admin/places/add",component:PlaceAddComponent, canActivate:[LoginGuard]},
  {path:"admin/menu",component:MenuComponent, canActivate:[LoginGuard]},
  {path:"admin/uploadPhoto",component:PlaceImageComponent, canActivate:[LoginGuard]},
  {path:"admin/comments",component:CommentListComponent, canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"places/placedetail/:placeId",component:PlaceDetailComponent, canActivate:[LoginGuard]},
  {path:"admin",component:AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
