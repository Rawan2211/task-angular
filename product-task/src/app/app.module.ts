import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import {HttpClient, HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { TextComponent } from './components/product/text/text.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { ProductAngularMaterialComponent } from './components/product-angular-material/product-angular-material.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptorService } from './user/services/token-interceptor.service';

export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http,'../assets/i18n/','.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    TextComponent,
    ProductAngularMaterialComponent,
    DialogComponent,
    LoginComponent

      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[HttpClient]
      },
      defaultLanguage:'en'
    })


  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }

],
  bootstrap: [AppComponent]
})
export class AppModule { }
