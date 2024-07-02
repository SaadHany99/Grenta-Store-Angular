import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductServiceService } from '../../../Service/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../../Models/ICategory';

@Component({
  selector: 'app-dash-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './dash-form.component.html',
  styleUrl: './dash-form.component.css'
})
export class DashFormComponent implements OnInit {
Product:any;
productID:any;
categories:ICategory[]=[];
constructor(public productService:ProductServiceService,public activatedRoute:ActivatedRoute,public router:Router) {}
dashForm=new FormGroup({
name:new FormControl('',[Validators.minLength(4),Validators.required]),
price:new FormControl(null,[Validators.required,Validators.min(50),Validators.max(750)]),
quantity:new FormControl(null,Validators.required),
image:new FormControl('',[Validators.pattern(/\.(jpg|jpeg)$/i)]),
description:new FormControl('',Validators.required),
categ_Id:new FormControl(null)
});  
ngOnInit(): void 
  {
    this.productID=this.activatedRoute.snapshot.params['id'];
    this.productService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    });
    this.activatedRoute.params.subscribe({
      next:(data)=>{
        this.productID=data['id'];
        this.getName.setValue('');
        this.getPrice.setValue(null);
        this.getQuantity.setValue(null);
        this.getImage.setValue('');
        this.getDescription.setValue('');
        this.getCategory.setValue(null);
      },
    });
    if(this.productID!=0){
      this.productService.getById(this.productID).subscribe({
        next:(data)=>{
          this.Product=data;
          this.getName.setValue(this.Product.name);
          this.getPrice.setValue(this.Product.price);
          this.getQuantity.setValue(this.Product.quantity);
          this.getImage.setValue(this.Product.image);
          this.getDescription.setValue(this.Product.description);
          this.getCategory.setValue(this.Product.categ_Id);
        },
      });
    }
  }
  get getName(){
    return this.dashForm.controls['name'];
  }
  get getPrice(){
    return this.dashForm.controls['price'];
  }
  get getQuantity(){
    return this.dashForm.controls['quantity'];
  }
  get getImage(){
    return this.dashForm.controls['image'];
  }
  get getDescription(){
    return this.dashForm.controls['description'];
  }
  get getCategory(){
    return this.dashForm.controls['categ_Id'];
  }
 
  
  ProductAction(){
 

    if(this.dashForm.status=='VALID'){
      if(this.productID==0){
        this.productService.addNewProduct(this.dashForm.value).subscribe({
          next:()=>{
            this.router.navigate(['/dashboard']);
          },
        });
      }else
         {
            console.log(this.dashForm.value);
            // console.log("product ID: "+this.productID);
            // console.log("Product : "+this.dashForm.value);
            this.productService.editProduct(this.productID,this.dashForm.value).subscribe({
            next:()=>{
              // console.log("Product : "+this.dashForm.value);
              this.router.navigate(['/dashboard']);
            },
           });
          }
    }else
    {
      console.log("Form Is INVALID");  
    }
    
    //   if(this.productID==0){
    //    this.router.navigate(['/dashboard']);
    // }else{
    //   //edit here
    //   debugger
    //   let id=this.productID=this.activatedRoute.snapshot.params['id'];
    //   console.log(this.Product);
      
    //   this.router.navigate(['/dashboard']);
    //   debugger
    // }


  }
}
