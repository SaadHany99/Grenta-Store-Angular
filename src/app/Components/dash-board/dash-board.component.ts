import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../Service/product-service.service';
import { IProduct } from '../../Models/IProduct';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements OnInit {
products:IProduct[]=[];
constructor(public productService:ProductServiceService) {}
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next:(data)=>{this.products=data},
      error:(err)=>{console.log(err)},
    });
  }
  deleteProduct(Id:number)
  {
    
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(Id).subscribe({
        next:()=>{this.products=this.products.filter(product=>product.id!=Id);},
        error:()=>{},
        complete:()=>{},
      });
    }

  }

}
