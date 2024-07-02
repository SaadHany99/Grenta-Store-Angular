import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from './../../../Service/product-service.service';
import { Component, OnInit} from '@angular/core';
import { IProduct } from '../../../Models/IProduct';
import { ICategory } from '../../../Models/ICategory';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})
export class ProductInfoComponent implements OnInit {

  Id:any;
  product?:IProduct;
  categories?:ICategory[];
  constructor(public productService:ProductServiceService,public activatedRoute:ActivatedRoute,public router:Router) {
    
  }
  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    });
    this.Id=this.activatedRoute.snapshot.params['id'];
    this.productService.getById(this.Id).subscribe({
      next:(data:any)=>{
        this.product=data;
        console.log(this.product);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  backtoproducts()
  {
    this.router.navigate(['/products']);
  }
}
