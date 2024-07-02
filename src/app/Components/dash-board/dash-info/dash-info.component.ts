import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../Service/product-service.service';
import { IProduct } from '../../../Models/IProduct';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dash-info',
  standalone: true,
  imports: [],
  templateUrl: './dash-info.component.html',
  styleUrl: './dash-info.component.css'
})
export class DashInfoComponent implements OnInit {
Id:any;
Product?:IProduct;
constructor(public productService:ProductServiceService,public activatedRoute:ActivatedRoute,public router:Router) {}
  ngOnInit(): void {
    this.Id=this.activatedRoute.snapshot.params['id'];
    this.productService.getById(this.Id).subscribe({
      next:(data)=>{this.Product=data},
      error:(err)=>{console.log(err);}
    });
  }
  backtodashboard(){
    this.router.navigate(['/dashboard']);
  }
}
