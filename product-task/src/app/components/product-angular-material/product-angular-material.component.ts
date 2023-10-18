import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/product/models/iproduct';
import { ProductsService } from 'src/app/product/services/products.service';
import { DialogComponent } from '../dialog/dialog.component';
import{TranslateService} from '@ngx-translate/core'
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
  currentLanguage!:string;

  constructor(public translate: TranslateService, private _snackBar: MatSnackBar,private fb:FormBuilder,public dialog:MatDialog,private route:ActivatedRoute,private router:Router,private productService:ProductsService)
  {

  }

changeCurrentLanguage(language:string){

    this.translate.use(language);
    localStorage.setItem('currentLanguage',language);

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


createProductForm(){
    this.ProductForm = new FormGroup({
    title: new FormControl(''),
    description:new FormControl(''),
    price:new FormControl(''),
    brand:new FormControl(''),
    image:new FormControl(''),
    type: new FormControl(''),
    id: new FormControl('')
  });
  }

ngOnInit(){
    this.displayProducts();
    this.createProductForm();
    this.getBrandCategeory();
    this.initBrandCategory();
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'en';
    this.translate.use(this.currentLanguage);
  }


displayProducts(){
    this.productService.getProducts()
    .subscribe(products=>{
      this.productList=products;

    })
  }

showForm(){
  this.clearForm();
    this.showAddButton=true;
    this.showUpdateButton=false;
    this.showProductForm= !this.showProductForm;
  }

addProduct(){
    this.productService.postProducts(this.ProductForm.value)
    .subscribe(_=>{
    this.clearForm();
    this.displayProducts();
    this.openSnackBar('Product Added Successfully', 'OK');
  })
  }

deletePrd(id:number){
    this.productService.deleteProduct(id)
    .subscribe(_=>{
      this.displayProducts();
      this.openSnackBar('Product Deleted Successfully', 'OK');
    });
  }

updatePrd(id:number){
    this.productService.updateProduct(id,this.ProductForm.value).subscribe(_=>{
      this.clearForm();
      this.displayProducts();
      this.openSnackBar('Product Updated Successfully', 'OK')
    });
    }

editProduct(product:{}){
      if(this.showProductForm===true){
      this.ProductForm.patchValue(product);


    }
    else{
      this.showForm();
      this.ProductForm.patchValue(product);

    }
    }

clearForm(){
      this.showAddButton=true;
      this.ProductForm.reset();
    }


saveButton(){
      if (this.ProductForm.value.id) {
        this.updatePrd(this.ProductForm.value.id);

      }
    else{
      this.addProduct();
    }
    }
}
