import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/product/models/iproduct';
import { ProductsService } from 'src/app/product/services/products.service';

@Component({
  selector: 'app-product-angular-material',
  templateUrl: './product-angular-material.component.html',
  styleUrls: ['./product-angular-material.component.scss']
})
export class ProductAngularMaterialComponent {
  public ProductForm!: FormGroup ;
  productList:IProduct[] =[];
  displayedColumns: string[] = ['title', 'description', 'price','brand', 'image'];


  constructor(private route:ActivatedRoute,private router:Router,private productService:ProductsService)
  {

  }
  clickedRows = new Set<IProduct>();

  createProductForm(){
    this.ProductForm = new FormGroup({
    title: new FormControl(''),
    description:new FormControl(''),
    price:new FormControl(''),
    brand:new FormControl(''),
    image:new FormControl('')
  });
  }
  ngOnInit(){
    this.displayProducts();
    this.createProductForm();
  }



  displayProducts(){
    this.productService.getProducts()
    .subscribe(products=>{
      this.productList=products;
    })
  }


}
