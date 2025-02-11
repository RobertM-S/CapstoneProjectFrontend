import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-logout',
  standalone: false,
  
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})

export class LogoutComponent implements OnInit {

  constructor(private userserv:UserService, private router: Router) {}

  ngOnInit() {
    this.userserv.logout();
    this.router.navigate(['login']);
  }

}
