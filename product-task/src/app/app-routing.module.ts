import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductformComponent } from './components/addproductform/addproductform.component';
import { ProductTableComponent } from './components/product-table/product-table.component';

const routes: Routes = [
  {path:'productform',component:AddproductformComponent},
  {path:'producttable',component:ProductTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
