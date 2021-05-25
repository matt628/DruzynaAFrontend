import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username = ''
  password = ''
  constructor(private auth: AuthService, private router: Router ) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.login(this.username, this.password)
    this.username = ''
    this.password = ''
    this.router.navigate(['/games-list']);
  }

}
