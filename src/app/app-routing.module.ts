import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-product' },
  { path: 'add-product', component: AddProductComponent },
  { path: 'purchaseOrder', component: PurchaseOrderComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'products-list', component: ListProductComponent },
  { path: 'print',
    outlet: 'print',
    component: PrintLayoutComponent,
    children: [
      { path: 'invoice/:invoiceIds', component: InvoiceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
