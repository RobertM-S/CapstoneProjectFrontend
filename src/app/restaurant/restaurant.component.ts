import { Component, Input } from '@angular/core';
import { Restaurant } from '../model/restaurant';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-restaurant',
  standalone: false,
  
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent {
  editVisible = false;
  @Input()
  restaurant:Restaurant
  constructor(private restaurantservice:RestaurantService, private route:ActivatedRoute, private router:Router, public us:UserService) {
    this.restaurant = {
      restaurantid:"",
      restaurantname: "", 
      description: "",
      restaurantimage: ""
    }
  }

  viewRestaurantProfile(id:string){
    this.router.navigate([id], {relativeTo:this.route}) 
  }

  onClick(){
    this.router.navigate([this.restaurant.restaurantid], {relativeTo:this.route}) 
  }

}
