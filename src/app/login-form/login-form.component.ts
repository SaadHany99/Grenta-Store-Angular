import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Service/login.service';
import { IUserCredentials } from '../Models/iuserCredentials';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule ,
    FormsModule ,
    ReactiveFormsModule 
    ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit{

  loginForm : FormGroup;
  responseMsg:any;
  constructor(private fb:FormBuilder , private loginService:LoginService , private router:Router ){
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    
  }
  registerPage(){
    this.router.navigate(['/register']);
  }

  onSubmit(){
    if(this.loginForm.valid){
      let user = <IUserCredentials> this.loginForm.value as IUserCredentials
      this.loginService.loginUser(user).subscribe( {
        next:(response)=>{
          this.router.navigateByUrl('/home')
        },
        error: (error)=>{
          this.responseMsg = error.error
        }
       } )
      }
    }
}
