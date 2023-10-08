import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/product/services/products.service';

@Component({
  selector: 'app-addproductform',
  templateUrl: './addproductform.component.html',
  styleUrls: ['./addproductform.component.scss']
})
export class AddproductformComponent {
  public addPrdForm = new FormGroup({
    title: new FormControl(''),
    description:new FormControl(''),
    price:new FormControl(''),
    brand:new FormControl(''),
    image:new FormControl('')
  });

constructor(private productService:ProductsService){}

  addProduct(){
    this.productService.postProducts(this.addPrdForm.value)
    .subscribe(res=>{
    this.addPrdForm.reset();
  })
  }
}
