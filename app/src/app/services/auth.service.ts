import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user;
  constructor() {
    this.user = {
      uid: 1,
      email: 'test@emai.com',
      displayName: 'admin',
      role: 'admin'
   }
   }

  switchAdmin() {
    this.user.role =  this.user.role === 'admin' ? 'user' : 'admin'
  }

  getUserRole() {
    return this.user.role;
  }

  isAdmin() {
    return this.user.role === 'admin' ? true : false
  }
  
}
