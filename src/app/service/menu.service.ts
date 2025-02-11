import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url:string = "http://localhost:3000/menus";

  constructor(private http:HttpClient) { }

  async getPriceOfFood(rid: String, fid: String): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.get<any>(this.url + '/' + rid + '/' + fid));
      return response;
    } catch (error) {
      console.error('Error fetching price of food:', error);
      throw error;
    }
  }
}