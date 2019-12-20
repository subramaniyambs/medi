import { Product } from './../../shared/product';
import { ApiService } from './../../shared/api.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { PrintService } from 'src/app/print.service';
import {formatDate } from '@angular/common';
interface Bank {
  id: string;
  name: string;
}



@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})

export class PurchaseOrderComponent implements OnInit {
  public bankCtrl: FormControl = new FormControl();
  filterDataArr = [];
  resultData;
  public bankFilterCtrl: FormControl = new FormControl();
  /** list of banks */
  private banks: Bank[] = [
    // {name: 'Bank A (Switzerland)', id: 'A'},
    // {name: 'Bank B (Switzerland)', id: 'B'},
    // {name: 'Bank C (France)', id: 'C'},
    // {name: 'Bank D (France)', id: 'D'},
    // {name: 'Bank E (France)', id: 'E'},
    // {name: 'Bank F (Italy)', id: 'F'},
    // {name: 'Bank G (Italy)', id: 'G'},
    // {name: 'Bank H (Italy)', id: 'H'},
    // {name: 'Bank I (Italy)', id: 'I'},
    // {name: 'Bank J (Italy)', id: 'J'},
    // {name: 'Bank K (Italy)', id: 'K'},
    // {name: 'Bank L (Germany)', id: 'L'},
    // {name: 'Bank M (Germany)', id: 'M'},
    // {name: 'Bank N (Germany)', id: 'N'},
    // {name: 'Bank O (Germany)', id: 'O'},
    // {name: 'Bank P (Germany)', id: 'P'},
    // {name: 'Bank Q (Germany)', id: 'Q'},
    // {name: 'Bank R (Germany)', id: 'R'} 
  ]

  typesProduct: any = ['Tablets', 'Syrup','Capsule', 'oinments'];
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  // @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @ViewChild('singleSelect', { static: true } as any) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  PurchaseOrderList: any = [];
  //dataSource: MatTableDataSource<Product>;
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['Product_name', 'quantity', 'price', 'total', 'action'];
  today= new Date();
  jstoday = '';
  formToday = '';
  billedTo;
  constructor(private studentApi: ApiService,public printService: PrintService) {
    // this.studentApi.GetProducts().subscribe((data:any) => {
    //   this.PurchaseOrderList = data.data;
    //   this.dataSource = new MatTableDataSource<Product>(this.PurchaseOrderList);
    //   setTimeout(() => {
    //     this.dataSource.paginator = this.paginator;
    //   }, 0);
    // })    

    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
     this.formToday = formatDate(this.today, 'dd-MM hh:mm:ss a', 'en-US', '+0530');
  }


  ngOnInit() {
    // set initial selection
    //    this.bankCtrl.setValue(this.banks[10]);

    // load the initial bank list
    //  this.filteredBanks.next(this.banks.slice());

    // listen for search field value changes
    // this.bankFilterCtrl.valueChanges
    //   .pipe(takeUntil(this._onDestroy))
    //   .subscribe(() => {
    //     this.filterBanks();
    //   });
  }

  // onPrintInvoice() {
  //   const invoiceIds = ['101'];
  //   this.printService
  //     .printDocument('invoice', invoiceIds);
  // }

  // formBillNum(){
  //   let val = this.formToday.replace(/[^a-zA-Z ]/g, "");
  //   return  val 
  // }
  onPrintInvoice1() {
    this.studentApi.purchasedProduct(this.dataSource).subscribe((data: any) => {
    })
    // const invoiceIds = ['101'];
    // this.printService
    //   .printDocument('invoice', invoiceIds);
  }

  onPrintInvoice()
  {
    this.savePurchasedDetails();
  window.print();
  } 

  savePurchasedDetails(){
    console.log(this.dataSource)
    let obj ={
      customer:this.billedTo,
      SGST:this.getStateGST(),
      CGST:this.getCentralGST(),
      TotalAmt:this.getOverAllTotal(),
      Data:this.dataSource
    }
    this.studentApi.purchasedProduct(obj).subscribe((data: any) => {
    })
  }

//   onPrintInvoice(): void {
//     let printContents, popupWin;
//     printContents = document.getElementById('print-section').innerHTML;
//     popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
//     popupWin.document.open();
//     popupWin.document.write(`
//       <html>
//         <head>
//           <title>Print taasddddddddddb</title>
//           <style>

//           //........Customized style.......
//           </style>
//         </head>
//     <body onload="window.print();window.close()">
//     <span>helloooooooooo</span>
//     ${printContents}
//     ${printContents}
//     </body>
//       </html>`
//     );
//     popupWin.document.close();
// }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  typeMedicine(evt, select) {
    this.studentApi.GetTypeMedicine(select).subscribe((data: any) => {
      this.resultData = data;
      this.bankCtrl.setValue(this.resultData[0]);

      // load the initial bank list
      this.filteredBanks.next(this.resultData.slice());
      this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
      console.log(this.filteredBanks)
      // this.dataSource = new MatTableDataSource<Product>(this.PurchaseOrderList);
      // setTimeout(() => {
      //   this.dataSource.paginator = this.paginator;
      // }, 0);
    })
  }

  AddMedicine(selectVal) {
    // this.bankCtrl.getValue()
    console.log(selectVal)
    console.log(this.bankFilterCtrl.value)
    // this.resultData = this.resultData.filter(
    //   data => data._id === selectVal);
    this.filterDataArr.push({ product_name: "test", price: "20", quantity: "33", type: "Tablets", total: "0" })
    this.PurchaseOrderList = this.filterDataArr;
    //this.dataSource = new MatTableDataSource<Product>(this.PurchaseOrderList);
    this.dataSource = this.PurchaseOrderList;
  }

  

  deleteProduct(index, data) {
    this.PurchaseOrderList.splice(index, 1);
    this.dataSource = this.PurchaseOrderList;
    //this.dataSource = new MatTableDataSource<Product>(this.PurchaseOrderList);
  }

  calculateTotal(element) {
    
    // return element.price * element.quantity
    let Quantity = element.Qty ? element.Qty : 0;
    return element.price * Quantity;
  }

  submitOrder() {
    console.log(this.PurchaseOrderList)
    // window.print();
  }

  getTotalCost() {
    return this.PurchaseOrderList.map(element => element.price * element.Qty).reduce((acc, value) => acc + value, 0);
  }

  getStateGST() {
    let value = this.getTotalCost();
    return value * 0.35 / 100;
  }


  getCentralGST() {
    let value = this.getTotalCost();
    return value * 0.40 / 100;
  }

  getOverAllTotal() {
    return this.getTotalCost() + this.getStateGST() + this.getCentralGST();
  }


  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }

  protected filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

}
