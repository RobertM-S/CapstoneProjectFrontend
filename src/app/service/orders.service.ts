import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basket } from '../model/basket';
import { Checkout } from '../model/checkout';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  url:string = "http://localhost:3000/orders";

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  addOrder(basket:Basket[]|Checkout[]){
    this.http.post(this.url, basket, this.httpOptions).subscribe(date => {});
  }
}
