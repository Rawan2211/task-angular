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
  public ProductForm = new FormGroup({
    title: new FormControl(''),
    description:new FormControl(''),
    price:new FormControl(''),
    brand:new FormControl(''),
    image:new FormControl('')
  });
  prdList:IProduct[];
  val:any;
  prd!: IProduct;
  showProductForm:boolean = false;
  constructor(private fb: FormBuilder,public route:ActivatedRoute,public router:Router,public productService:ProductsService)
  {
  this.prdList=[
  ]
  }

  ngOnInit(){
    this.displayProducts();

  }

  addProduct(){
    this.productService.postProducts(this.ProductForm.value)
    .subscribe(res=>{
    this.ProductForm.reset();
    window.location.reload()
  })
  }

  displayProducts(){
    this.productService.getProducts()
    .subscribe(products=>{
      this.prdList=products;
    })
  }

  deletePrd(id:number){
    this.productService.deleteProduct(id)
    .subscribe(data=>{
    });
    this.productService.getProducts().subscribe((response)=>{
      this.prdList=response;
    });
    window.location.reload();

  }

    selectProduct(id:number){
    let val=id;
      this.productService.getProductById(val).subscribe(data=>{
        this.prd=data;
        this.ProductForm.patchValue(this.prd);
      })
    }


  updatePrd(id:number,data:any){
    this.productService.updateProduct(id,data).subscribe(data=>{

    });
    this.ProductForm.reset();
    window.location.reload();
    }

    showForm(){
      this.showProductForm= !this.showProductForm;
    }
}
