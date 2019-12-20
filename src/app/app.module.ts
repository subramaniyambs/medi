import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';


/* Angular material */
import { AngularMaterialModule } from './material.module';
import { ApiService } from './shared/api.service';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
// import { ProductService } from './product.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {NgxPrintModule} from 'ngx-print';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    EditProductComponent,
    ListProductComponent,
    PurchaseOrderComponent,
    InvoiceComponent,
    PrintLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMatSelectSearchModule,
    NgxPrintModule,
    MatSnackBarModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
