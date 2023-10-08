import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddproductformComponent } from './components/addproductform/addproductform.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductsService } from './product/services/products.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddproductformComponent,
    ProductTableComponent

      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
