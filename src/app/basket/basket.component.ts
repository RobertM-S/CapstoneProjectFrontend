import { Component } from '@angular/core';
import { Food } from '../model/food';
import { BasketService } from '../service/basket.service';
import { UserService } from '../service/user.service';
import { FoodService } from '../service/food.service';
import { Checkout } from '../model/checkout';
import { Basket } from '../model/basket';
import { OrdersService } from '../service/orders.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-basket',
  standalone: false,
  
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {

  basketPrice:number = 0;
  basketItems:number = 0;
  basketRestaurants:Set<number> = new Set();
  uniqueRestaurants:number = 0;
  checkouts:Checkout[];
  basket:Basket[];
  deliveryFee:number = 3.50;
  deliveryCharge:number = 0;
  quantity:number = 0;
  editQuantity:number = 0;
  constructor(private router:Router, private foodservice:FoodService, public us:UserService, private basketservice:BasketService, private ordersservice:OrdersService) {
    this.checkouts = [{
      bid: 0,
      fid:0, //
      foodname:"",
      image:"",
      price:0,
      quantity:0, //
      totalprice:0, //
      rid:0, //
      uid:null
    }];

    this.basket = [{
      bid:null,
      fid:0,
      uid:null,
      quantity:0,
      totalprice:0,
      rid:0
    }]
  }

  async ngOnInit(): Promise<void> {

    if(this.us.isAuthenticated()){
      const resp = await this.foodservice.getAllFoodsFromBasket(localStorage.getItem('id') || "")
      this.checkouts = resp.food;
      for(let i = 0; i < this.checkouts.length; i++){
        this.checkouts[i].uid = Number(localStorage.getItem('id'));
      }
    } else {
      this.checkouts = JSON.parse(sessionStorage.getItem("basket") || "[]");
      this.basket = JSON.parse(sessionStorage.getItem("basket") || "[]");
      for(let i = 0; i < this.checkouts.length; i++){
        this.foodservice.getMenuDetailsOfFood(this.checkouts[i].rid.toString(), this.checkouts[i].fid.toString())
        .subscribe(resp => {
          this.checkouts[i].bid = i;
          this.checkouts[i].foodname = resp.food.foodname;
          this.checkouts[i].image = resp.food.image;
          this.checkouts[i].price = resp.food.price;
        })
      }
    }
    for(let i = 0; i < this.checkouts.length; i++){
      this.basketPrice += this.checkouts[i].totalprice;
      this.basketItems += this.checkouts[i].quantity;
      this.basketRestaurants.add(this.checkouts[i].rid);
    }
    this.uniqueRestaurants = this.basketRestaurants.size;
    this.deliveryCharge = this.deliveryFee * this.uniqueRestaurants;
  }

  onEdit(editQuantity:number, checkout:Checkout){
    if(this.us.isAuthenticated()){
      this.basketservice.updateBasket(checkout.fid, Number(localStorage.getItem('id')), checkout.rid, editQuantity, checkout.price*Number(editQuantity));
    } else {
      this.checkouts[checkout.bid].quantity = editQuantity;
      this.checkouts[checkout.bid].totalprice = checkout.price*editQuantity;
      for(let i = 0; i < this.checkouts.length; i++){
        this.basket[i].quantity = this.checkouts[i].quantity;
        this.basket[i].totalprice = this.checkouts[i].totalprice;
      }
      sessionStorage.setItem("basket", JSON.stringify(this.basket));
    }
    window.location.reload();
  }

  onCheckout(){
    if(this.us.isAuthenticated()){
      this.ordersservice.addOrder(this.checkouts);
      this.basketservice.removeUserBasket(Number(localStorage.getItem('id')));
    } else {
      this.ordersservice.addOrder(this.basket);
      sessionStorage.removeItem("basket");
    }
    this.router.navigate([''])
  }
}
