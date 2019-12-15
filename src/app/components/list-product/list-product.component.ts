import { Product } from './../../shared/product';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  ProductData: any = [];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['Product_name', 'quantity', 'price', 'type','action'];

  constructor(private productApi: ApiService) {
    this.productApi.GetProducts().subscribe((data:any) => {
      this.ProductData = data;
      this.dataSource = new MatTableDataSource<Product>(this.ProductData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteProduct(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.productApi.DeleteProduct(e._id).subscribe()
    }
  }

}
