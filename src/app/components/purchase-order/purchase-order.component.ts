import { Product } from './../../shared/product';
import { ApiService } from './../../shared/api.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
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

  typesProduct: any = ['Tablets', 'Syrup', 'oinments'];
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  // @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @ViewChild('singleSelect', { static: true } as any) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  PurchaseOrderList: any = [];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['Product_name', 'quantity', 'price', 'total', 'action'];
  displayedGstColumns: string[] = ['Product_name', 'quantity', 'price', 'total', 'action'];

  constructor(private studentApi: ApiService) {
    // this.studentApi.GetProducts().subscribe((data:any) => {
    //   this.PurchaseOrderList = data.data;
    //   this.dataSource = new MatTableDataSource<Product>(this.PurchaseOrderList);
    //   setTimeout(() => {
    //     this.dataSource.paginator = this.paginator;
    //   }, 0);
    // })    
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
    this.resultData = this.resultData.filter(
      data => data._id === selectVal);
    this.filterDataArr.push({ product_name: selectVal, price: "20", quantity: "33", type: "Tablets", total: "0" })
    this.PurchaseOrderList = this.filterDataArr;
    this.dataSource = new MatTableDataSource<Product>(this.PurchaseOrderList);
  }

  deleteProduct(index, data) {
    this.PurchaseOrderList.splice(index, 1);
    this.dataSource = new MatTableDataSource<Product>(this.PurchaseOrderList);
  }

  calculateTotal(element) {
    return element.price * element.quantity
  }

  submitOrder() {
    console.log(this.PurchaseOrderList)
    // window.print();
  }

  getTotalCost() {
    return this.PurchaseOrderList.map(element => element.price * element.quantity).reduce((acc, value) => acc + value, 0);
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
