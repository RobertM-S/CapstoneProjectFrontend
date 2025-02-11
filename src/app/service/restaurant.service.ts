import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../model/restaurant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  url:string = "http://localhost:3000/restaurants";

  constructor(private http:HttpClient) { }

  getRestaurantsByPostcode(postcode:String):Observable<any>{
    return this.http.get<any>(this.url+'/address/'+postcode)
  }

  getAllRestaurants():Observable<any> {
    return this.http.get<any>(this.url);
  }

  getRestaurantById(id:String):Observable<any> {
    return this.http.get<any>(this.url+"/"+id)
  }

  getAllFoodsInRestauront(id:String):Observable<any> {
    return this.http.get<any>(this.url+"/"+id+"/listmenu")
  }

  removePostcode(){
    localStorage.removeItem("postcode");
  }

  getTotalPrice(fid:String, rid:String, quantity:number):Observable<any> {
    return this.http.get<any>(this.url+"/"+rid+"/"+fid)
  }

}