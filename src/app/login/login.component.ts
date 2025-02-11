import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { addressService } from '../service/address.service';
import { BasketService } from '../service/basket.service';
import { Basket } from '../model/basket';


@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginValid = true;
  public username = '';
  public password = '';

  constructor(private router:Router, private userserv:UserService, private addressserv:addressService, private baskerservice:BasketService) { }

  public onSubmit(): void {
    this.loginValid = true;
    this.userserv.loginUser(this.username)
    .subscribe({next: resp => {
      if(resp !== undefined && resp.length!=0){
        for(let user of resp.user){
          if(user.password === this.password){
            localStorage.setItem("username", this.username);
            this.addressserv.getAddress(user.uid)
            .subscribe(resp => {
              localStorage.setItem("postcode", resp.address[0].postcode);
            })
            localStorage.setItem("id", user.uid);
            let sessionBasket: string | null = sessionStorage.getItem("basket");
            if(sessionBasket !== null){
              const baskets: Basket[] = JSON.parse(sessionBasket);
              for(let basket of baskets){
                basket.uid = user.uid;
                this.baskerservice.addToBasket(basket);
              }
              sessionStorage.removeItem("basket");
            }
            this.router.navigate([''])
          }
        }
      } else {
        this.loginValid = false;
      }
    }
    })
  }

}
