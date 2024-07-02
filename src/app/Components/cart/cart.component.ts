import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductServiceService } from '../../Service/product-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  productList : any;
  categories :any;
  username:string|null='';
  userId:string | null= localStorage.getItem("UserId");
  constructor(public productService:ProductServiceService){
    
  }
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.productService.GetUserCarts(this.userId).subscribe({
      next:(res)=>{
        this.productList=res;
        console.log(this.productList);
        },
        error:(err)=>{
          console.log(err);
          }
    });
    
    this.productService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

}
