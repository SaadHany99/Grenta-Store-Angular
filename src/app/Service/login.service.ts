import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserCredentials } from '../Models/iuserCredentials';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'https://localhost:7124/api/Auth'
  private jwtHelper = new JwtHelperService();
  userRole:string='';
  constructor(private http: HttpClient, private router: Router) { }
  loginUser(user: IUserCredentials) {
    return this.http.post<any>(`${this.baseUrl}/login`, user)
      .pipe(
        tap(response => {
          if (response && response.token) {
           console.log(response.roles[0]);
           this.userRole = response.roles[0];
           console.log(this.userRole);
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.roles[0]);
            localStorage.setItem('username',response.username);//UserId
            localStorage.setItem('UserId',response.userId);
          }
        })

      )
  }
  getUserRole(): string {
    return this.userRole;
  }

  isAdmin(): boolean{
    return localStorage.getItem('role') === 'Admin';
  }
  getUserName(): string|null {
    return localStorage.getItem('username');
  }
 

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token)
  }
}
