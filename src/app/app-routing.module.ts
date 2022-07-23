import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceComponent } from './components/place/place.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:PlaceComponent},
  {path:"places",component:PlaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
