import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-homepage',
  standalone: false,
  
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  postcode:string = "";

  constructor(public us:UserService, private router:Router){}

  public onSubmit(){
    if(!this.us.isAuthenticated()){
      localStorage.setItem("postcode", this.postcode.toUpperCase());
    }
    this.router.navigate(['restaurants'])
  }

}
