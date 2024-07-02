import { CommonModule } from '@angular/common';
import { IProduct } from '../../Models/IProduct';
import { ProductServiceService, UserProducts } from './../../Service/product-service.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICategory } from '../../Models/ICategory';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { delay } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,MatSnackBarModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
productList:IProduct[]=[];
oldprice:number=0;
categories?:ICategory[];
show:boolean = false;
constructor(public productService:ProductServiceService,public snack:MatSnackBar) {
  
}
  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    });
   this.productService.getAllProducts().subscribe({
    next:(data:any)=>{
      this.productList=data;
    },
    error:(err)=>{
      console.log(err);
    }
   });

  }
  addToCart(productId:number) {
    const userProduct: UserProducts = {
      userId: localStorage.getItem("UserId"), // Replace with dynamic userId if needed
      productId: productId // Replace with dynamic productId if needed
    };

    this.productService.addToCart(userProduct).subscribe({
      next: () => {
        this.show = true;
        setTimeout(() => {
          this.show = false;
      }, 3000); 
      },
      error: (err) => {
        console.error('Error adding item to cart', err);
      }
    });

  }

}
