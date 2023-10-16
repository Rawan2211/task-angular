import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  displayedColumns: string[] = ['title', 'description', 'price','brand', 'image','type','edit','details'];
  product!: IProduct;
  showProductForm:boolean = false;
  showAddButton:boolean =false;
  showUpdateButton:boolean=false;
  clickedRows = new Set<IProduct>();
  autoComplete = "auto"
  brandOptions=[];
  filterOptions=[];
  showProductDetails:boolean = false;
  constructor(private _snackBar: MatSnackBar,private fb:FormBuilder,public dialog:MatDialog,private route:ActivatedRoute,private router:Router,private productService:ProductsService)
  {

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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
    data:{
      rowData:row,
    message:"showdata"
    }
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
    Message:"update",
    showDialog:"show"
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
    this.showAddButton=true;
    this.showUpdateButton=false;
    this.showProductForm= !this.showProductForm;
  }



  addProduct(){
    this.productService.postProducts(this.ProductForm.value)
    .subscribe(res=>{
    this.ProductForm.reset();
    this.displayProducts();
    // this.openAddMessage();
    this.openSnackBar('Product Added Successfully', 'OK');
  })
  }

  deletePrd(id:number){
    this.productService.deleteProduct(id)
    .subscribe(data=>{
      this.displayProducts();
      // this.openDeleteMessage();
      this.openSnackBar('Product Deleted Successfully', 'OK');
    });
  }


  updatePrd(id:number){
    this.productService.updateProduct(id,this.ProductForm.value).subscribe(data=>{
      this.ProductForm.reset();
      this.displayProducts();
      // this.openUpdateMessage();
      this.openSnackBar('Product Updated Successfully', 'OK')
    });
    }

    editProduct(id:number){
      if(this.showProductForm===true){
        this.showAddButton=false;
        this.showUpdateButton=true;
      this.productService.getProductById(id).subscribe(data=>{
        this.product=data;
        this.ProductForm.patchValue(this.product);
      })
    }
    else{
      this.showForm();
      this.showAddButton=false;
      this.showUpdateButton=true;
      this.productService.getProductById(id).subscribe(data=>{
        this.product=data;
        this.ProductForm.patchValue(this.product);
  })
    }
    }

    clearForm(){
      this.showAddButton=true;
      this.ProductForm.reset();
    }


    saveButton(id:number){
      if (this.showAddButton==true && this.showUpdateButton==false) {
        this.addProduct();

      }
    else if(this.showUpdateButton==true && this.showAddButton==false){
      this.updatePrd(id);
    }
    }
}
