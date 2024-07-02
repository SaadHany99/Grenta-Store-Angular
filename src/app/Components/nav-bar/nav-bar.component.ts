import { CommonModule } from '@angular/common';
import { LoginService } from './../../Service/login.service';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  
  constructor(private loginService:LoginService) {
    
    
  }
  user:any=this.loginService.getUserName();
  logout(){
    this.loginService.logout();
  }
  isAdmin(){
   return this.loginService.isAdmin();
  }
  isLogin(){
   return this.loginService.isLoggedIn();
  }
  
}
