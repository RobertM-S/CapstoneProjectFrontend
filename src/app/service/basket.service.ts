import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { UserService } from './user.service';
import { Basket } from '../model/basket';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  url:string = "http://localhost:3000/baskets";

  constructor(private http:HttpClient, public us:UserService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  updateBasket(fid:number, uid:number, rid:number, quantity:number, totalprice:number){
    if(this.us.isAuthenticated()){
        this.http.put(this.url+"/edit", {fid, uid, rid, quantity, totalprice}, this.httpOptions).subscribe(date => {});
    }
  }

  removeUserBasket(uid:number){
    this.http.delete(this.url+"/delete/"+uid).subscribe(date => {});
  }

  addToBasket(basket:Basket){
    if(this.us.isAuthenticated()){
        this.http.post(this.url+"/add", basket, this.httpOptions).subscribe(date => {});
    } else{
      let sessionBasket: string | null = sessionStorage.getItem("basket");
      if (sessionBasket === null) {
        sessionBasket = '[';
      }
      else {
        sessionBasket = sessionBasket.substring(0, sessionBasket.length - 1) + ",";
      }
      sessionBasket += JSON.stringify(basket) + "]";
      sessionStorage.setItem("basket", sessionBasket);
    }
  }

}
