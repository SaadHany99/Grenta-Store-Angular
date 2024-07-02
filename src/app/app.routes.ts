import { Routes } from '@angular/router';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductInfoComponent } from './Components/products/product-info/product-info.component';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { DashInfoComponent } from './Components/dash-board/dash-info/dash-info.component';
import { DashFormComponent } from './Components/dash-board/dash-form/dash-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AuthGuardService } from './Service/auth-guard.service';
import { CartComponent } from './Components/cart/cart.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginFormComponent},
    {path:'register',component:RegisterFormComponent},
    

    {path:'about',component:AboutUsComponent},
    {path:'cart',component:CartComponent},
    {path:'products',component:ProductsComponent ,canActivate: [AuthGuardService]},
    {path:'products/:id',component:ProductInfoComponent ,canActivate: [AuthGuardService]},
    {path:'dashboard',component:DashBoardComponent,canActivate: [AuthGuardService]},
    {path:'dashboard/:id',component:DashInfoComponent,canActivate: [AuthGuardService]},
    {path:'dashboard/:id/edit',component:DashFormComponent,canActivate: [AuthGuardService]},
    // 404 page
    {path:'**',component:NotFoundComponent},
];
