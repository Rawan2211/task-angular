import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
public addProductForm!:FormGroup;
constructor(private formBuilder: FormBuilder , private http:HttpClient){

}
ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      title:[''],
      description:[''],
      price:[''],
      brand:[''],
      image:['']

    })
}
addProduct(){
this.http.post<any>("http://localhost:3000/products",this.addProductForm.value)
.subscribe(res=>{
  alert("product added successfully");
  this.addProductForm.reset();
})
}
}
