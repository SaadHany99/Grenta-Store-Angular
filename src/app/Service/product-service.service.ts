import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/IProduct';
import { ICategory } from '../Models/ICategory';
import { ICart } from '../Models/ICart';

export interface UserProducts {
  userId: string | null;
  productId: number;
}
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  baseUrl:string='https://localhost:7124/api/Products';
 
  constructor(private http:HttpClient) { }

  getAllProducts():Observable<IProduct[]>
  {
    return this.http.get<IProduct[]>(this.baseUrl);
  }
  getById(productId:number):Observable<IProduct>
  {
    return this.http.get<IProduct>(`${this.baseUrl}/${productId}`);
  }
  addNewProduct(product:any){
    return this.http.post(this.baseUrl,product);
  }
  editProduct(productId:number,product:any){
    return this.http.put(`${this.baseUrl}/${productId}`,product);
  }
  deleteProduct(productId:number){
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }
  getAllCategories():Observable<ICategory[]>{
    return this.http.get<ICategory[]>(`${this.baseUrl}/categ`);
  }
  // AddToCart(userId:string , productId:number):Observable<any>{
  //   const body = { userId, productId };
  //   return this.http.post(`${this.baseUrl}/AddToCart`,body);
  // }

  addToCart(userProduct: UserProducts): Observable<any> {
    return this.http.post(`${this.baseUrl}/AddToCart`, userProduct);
  }

  GetUserCarts(userId: string | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/UserCards/${userId}`);
  }

}
