import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
product:IProduct[];
  constructor(private http : HttpClient) {
    this.product=[]
    }
  postProducts(data : any){
    return this.http.post<any>("http://localhost:3000/products",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getProducts(){
    return this.http.get<any>("http://localhost:3000/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getProductById(id:number){
    return this.http.get<any>(`http://localhost:3000/products/${id}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteProduct(id:number){
    return this.http.delete<any>(`http://localhost:3000/products/${id}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateProduct(id:number,data:any){
    return this.http.put<any>(`http://localhost:3000/products/${id}`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
