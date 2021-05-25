import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  getUserRole(){
    return this.auth.getUserRole();
  }

  setUserRoleToAdmin() {
    this.auth.user.role = 'admin'
  }

  setUserRoleToUser() {
    this.auth.user.role = 'user'
  }
}
