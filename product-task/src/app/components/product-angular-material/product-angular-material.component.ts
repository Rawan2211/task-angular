import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/product/models/iproduct';
import { ProductsService } from 'src/app/product/services/products.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-product-angular-material',
  templateUrl: './product-angular-material.component.html',
  styleUrls: ['./product-angular-material.component.scss']
})
export class ProductAngularMaterialComponent {
  public ProductForm!: FormGroup ;
  productList:IProduct[] =[];
  displayedColumns: string[] = ['title', 'description', 'price','brand', 'image','type','edit'];
  product!: IProduct;
  showProductForm:boolean = false;
  clickedRows = new Set<IProduct>();
  autoComplete = "auto"
  brandOptions=[];
  filterOptions=[];
  showProductDetails:boolean = false;
  constructor(private fb:FormBuilder,public dialog:MatDialog,private route:ActivatedRoute,private router:Router,private productService:ProductsService)
  {

  }

getBrandCategeory(){
  this.productService.getBrand().subscribe(response=>{
    this.brandOptions=response;
    this.filterOptions=response;
  })
}

filterBrandData(enteredData: string){
this.filterOptions = this.brandOptions.filter( (data :any) => {
  return data.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
})
}

initBrandCategory(){
  this.ProductForm.get('brand')?.valueChanges.subscribe(response =>{
    this.filterBrandData(response);
  })
  }

openDescriptionDialog(row:any){
  this.dialog.open(DialogComponent,{
    data:row
  });
}

getDetailsOfProduct(id:number){
  let data=this.productService.getProductById(id);
  return data;

}
openAddMessage(){
  this.dialog.open(DialogComponent,{data:{
Message:"add"
}
})
}
openDeleteMessage(){
  this.dialog.open(DialogComponent,{data:{
Message:"delete"
}
})
}
openUpdateMessage(){
  this.dialog.open(DialogComponent,{data:{
    Message:"update"
    }
    })
}

  createProductForm(){
    this.ProductForm = new FormGroup({
    title: new FormControl(''),
    description:new FormControl(''),
    price:new FormControl(''),
    brand:new FormControl(''),
    image:new FormControl(''),
    type: new FormControl('')
  });
  }

  ngOnInit(){
    this.displayProducts();
    this.createProductForm();
    this.getBrandCategeory();
    this.initBrandCategory();
  }


  displayProducts(){
    this.productService.getProducts()
    .subscribe(products=>{
      this.productList=products;
    })
  }

  showForm(){
    this.showProductForm= !this.showProductForm;
  }


  addProduct(){
    this.productService.postProducts(this.ProductForm.value)
    .subscribe(res=>{
    this.ProductForm.reset();
    this.displayProducts();
    this.openAddMessage();
  })
  }

  deletePrd(id:number){
    this.productService.deleteProduct(id)
    .subscribe(data=>{
      this.displayProducts();
      this.openDeleteMessage();
    });
  }


  updatePrd(id:number){
    this.productService.updateProduct(id,this.ProductForm.value).subscribe(data=>{
      this.ProductForm.reset();
      this.displayProducts();
      this.openUpdateMessage();
    });
    }

    editProduct(id:number){
      if(this.showProductForm===true){

      this.productService.getProductById(id).subscribe(data=>{
        this.product=data;
        this.ProductForm.patchValue(this.product);
      })
    }
    else{
      this.showForm();
      this.productService.getProductById(id).subscribe(data=>{
        this.product=data;
        this.ProductForm.patchValue(this.product);

  })
    }
    }


}
