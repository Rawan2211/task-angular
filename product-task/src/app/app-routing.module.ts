import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAngularMaterialComponent } from './components/product-angular-material/product-angular-material.component';
import { ProductComponent } from './components/product/product.component';
import { TextComponent } from './components/product/text/text.component';

const routes: Routes = [
  {path:'product',component:ProductComponent},
  {path:'productAngular',component:ProductAngularMaterialComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
