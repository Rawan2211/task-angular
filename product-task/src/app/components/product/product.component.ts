import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/product/models/iproduct';
import { ProductsService } from 'src/app/product/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public ProductForm!: FormGroup ;
  productList:IProduct[] =[];
  public input:any;
  product!: IProduct;
  showProductForm:boolean = false;
  textValue!:string;
  constructor(private route:ActivatedRoute,private router:Router,private productService:ProductsService)
  {

  }
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

  addProduct(){
    this.productService.postProducts(this.ProductForm.value)
    .subscribe(res=>{
    this.ProductForm.reset();
    this.displayProducts();
  })
  }

  displayProducts(){
    this.productService.getProducts()
    .subscribe(products=>{
      this.productList=products;
    })
  }

  deletePrd(id:number){
    this.productService.deleteProduct(id)
    .subscribe(data=>{
      this.displayProducts();
    });
  }

    editProduct(id:number){

      this.productService.getProductById(id).subscribe(data=>{
        this.product=data;
        this.ProductForm.patchValue(this.product);
      })
    }


  updatePrd(id:number){
    this.productService.updateProduct(id,this.ProductForm.value).subscribe(data=>{
      this.ProductForm.reset();
      this.displayProducts();
    });
    }

    showForm(){
      this.showProductForm= !this.showProductForm;
    }

    getTextValue(value:string)
    {
      this.textValue=value;
    }

}
