import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class addressService {
  url:string = "http://localhost:3000/addresses";

  constructor(private http:HttpClient, public us:UserService) { }

  getAddress(id : number):Observable<any>{
    return this.http.get<any>(this.url+"/user/"+id);
  }

}
