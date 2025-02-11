import { Component, Input } from '@angular/core';
import { Restaurant } from '../model/restaurant';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Food } from '../model/food';

@Component({
  selector: 'app-restaurantprofile',
  standalone: false,
  
  templateUrl: './restaurantprofile.component.html',
  styleUrl: './restaurantprofile.component.css'
})
export class RestaurantprofileComponent {
  editVisible = false;
  @Input()
  restaurant:Restaurant
  foods:Food[];
  constructor(private restaurantservice:RestaurantService, private route:ActivatedRoute, private router:Router, public us:UserService) {
    this.restaurant = {
      restaurantid:"",
      restaurantname: "", 
      description: "",
      restaurantimage: ""
    }
    this.foods = [{
      foodid:"",
      foodname:"",
      description:"",
      price:0,
      image:"",
    }]
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.restaurant.restaurantid = data['id']
    })
    this.restaurantservice.getRestaurantById(this.restaurant.restaurantid)
    .subscribe(resp => {
      this.restaurant = resp.restaurant;
    })
    this.restaurantservice.getAllFoodsInRestauront(this.restaurant.restaurantid)
    .subscribe(resp => {
      this.foods = resp.restaurant;
    })
    }

}
