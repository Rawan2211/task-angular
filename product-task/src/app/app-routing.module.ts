import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthClassGuard } from './components/guard/auth-class.guard';
import { LoginComponent } from './components/login/login.component';
import { ProductAngularMaterialComponent } from './components/product-angular-material/product-angular-material.component';
import { ProductComponent } from './components/product/product.component';
import { TextComponent } from './components/product/text/text.component';

const routes: Routes = [
  {path:'product',component:ProductComponent},
  {path:'productAngular',component:ProductAngularMaterialComponent,canActivate:[AuthClassGuard]},
  {path:'login',component:LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
