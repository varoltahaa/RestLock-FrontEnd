import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceComponent } from './components/place/place.component';
import { PlaceCategoryComponent } from './components/place-category/place-category.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PlaceAddComponent } from './components/place-add/place-add.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PlaceDetailComponent } from './components/place-detail/place-detail.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { PlaceImageComponent } from './components/place-image/place-image.component';
import { AdminComponent } from './components/admin/admin.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceComponent,
    PlaceCategoryComponent,
    NaviComponent,
    CarouselComponent,
    PlaceAddComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    PlaceDetailComponent,
    FilterPipePipe,
    PlaceImageComponent,
    AdminComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
