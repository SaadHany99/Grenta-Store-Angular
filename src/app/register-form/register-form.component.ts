import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../Service/register.service';
import { Iuser } from '../Models/iuser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule ,
    FormsModule ,
    ReactiveFormsModule ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  registrationForm: FormGroup;
  roles:any;
   constructor(private fb: FormBuilder, private registerService: RegisterService,private router:Router) {
     this.registrationForm = this.fb.group({
       FullName: ['', [Validators.required]],
       Username: ['', [Validators.required]],
       Email: ['', [Validators.required, Validators.email]],
       Password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{6,}$')]],
       confirmedPassword: ['', [Validators.required]],
       roleName: ['User',Validators.required]
 
     }
      // { validators: [confirmPasswordValidator()] }
      )
   }
 
 
 
   ngOnInit(): void {
 
    //  this.permissionService.getAllRoles().subscribe({
    //    next:(res)=>{
    //      this.roles=res;
    //    }
    //  })
   }
 
   onSubmit() {
     if (this.registrationForm.valid) {
       let user = <Iuser>this.registrationForm.value as Iuser
       this.registerService.registerUser(user).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          alert("User registered Successfully")
         },
         
      });
 
     }
  }
  loginPage(){
    this.router.navigate(['/login']);
  }
}
