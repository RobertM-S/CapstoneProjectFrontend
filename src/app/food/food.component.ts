import { Component, Input } from '@angular/core';
import { Food } from '../model/food';
import { Basket } from '../model/basket';
import { RestaurantService } from '../service/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { MenuService } from '../service/menu.service';
import { BasketService } from '../service/basket.service';

@Component({
  selector: 'app-food',
  standalone: false,
  
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export class FoodComponent {
  quantity:number = 0;
  @Input()
  restaurantid:String
  @Input()
  food:Food
  basket:Basket
  constructor(private restaurantservice:RestaurantService, private menuservice:MenuService, private basketservice:BasketService, private route:ActivatedRoute, private router:Router, public us:UserService) {
    this.food = {
      foodid:"",
      foodname:"",
      description:"",
      price:0,
      image:"",
    }
    this.basket = {
      bid:null,
      fid:0,
      uid:null,
      quantity:0,
      totalprice:0,
      rid:0,

    }
    this.restaurantid = ""
  }

  async onBasket(){
    this.basket.fid=Number(this.food.foodid);
    this.basket.uid=Number(localStorage.getItem('id'));
    this.basket.quantity=this.quantity;
    this.route.params.subscribe(data => {
      this.basket.rid = Number(data['id'])
    })
    this.menuservice.getPriceOfFood(this.restaurantid, this.food.foodid)
    try {
      const resp = await this.menuservice.getPriceOfFood(this.restaurantid, this.food.foodid);
      this.basket.totalprice = Math.round(resp.restaurant[0].price * this.quantity * 100) / 100;
    } catch (error) {
      console.error('Error fetching price of food:', error);
    }
    this.basketservice.addToBasket(this.basket)
  }

}
