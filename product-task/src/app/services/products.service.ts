import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }
  postProducts(data : any){
    return this.http.post<any>("http://localhost:3000/products",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


}
