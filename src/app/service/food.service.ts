import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  url:string = "http://localhost:3000/foods";

  constructor(private http:HttpClient, public us:UserService) { }

  async getAllFoodsFromBasket(id: String) {
    try {
      return await this.http.get<any>(this.url + '/basket/' + id).toPromise();
    } catch (error) {
      console.error('Error fetching foods from basket:', error);
      throw error;
    }
  }

  getMenuDetailsOfFood(rid:String, fid:String){
    return this.http.get<any>(this.url + '/menu/' + rid + '/' + fid);
  }

}


