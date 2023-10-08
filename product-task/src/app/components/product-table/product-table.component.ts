import { Component } from '@angular/core';
import { IProduct } from 'src/app/product/models/iproduct';
import { ProductsService } from 'src/app/product/services/products.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  prdList:IProduct[];
  constructor(private productService:ProductsService){
  this.prdList=[
  ]
  }
  ngOnInit(){
    this.displayProducts();
  }
  displayProducts(){
    this.productService.getProducts()
    .subscribe(products=>{
      this.prdList=products;
    })
  }

}
