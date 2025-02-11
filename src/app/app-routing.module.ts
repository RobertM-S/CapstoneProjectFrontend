import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './service/auth.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantprofileComponent } from './restaurantprofile/restaurantprofile.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [
  {path: 'home', component:HomepageComponent},
  {path: 'login', component:LoginComponent},
  {path: 'logout', component:LogoutComponent},
  {path: 'restaurants', component:RestaurantsComponent},
  {path: 'basket', component:BasketComponent},
  {path:'' ,redirectTo:'home',pathMatch:'full'},
  {path:'restaurants/:id', component:RestaurantprofileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
