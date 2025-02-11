import { Component } from '@angular/core';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../model/restaurant';

@Component({
  selector: 'app-restaurants',
  standalone: false,

  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css'
})
export class RestaurantsComponent {
  restaurants: Restaurant[];
  constructor(private restaurantservice: RestaurantService, private route: ActivatedRoute, private router: Router) {
    this.restaurants = [{
      restaurantid: "",
      restaurantname: "",
      description: "",
      restaurantimage: ""
    }]
    
  }
  ngOnInit(): void {
    const postcode = localStorage.getItem("postcode");
    if (postcode === null || postcode == "") {
      this.restaurantservice.getAllRestaurants()
        .subscribe(resp => {
          this.restaurants = resp;
        })
    } else {
      this.restaurantservice.getRestaurantsByPostcode(postcode)
        .subscribe(resp => {
          this.restaurants = resp.restaurant;
        })
    }
  }
}
