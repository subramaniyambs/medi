import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ApiService } from './shared/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PrintService } from './print.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'Sankara Medical Shop';
  opened = true;
  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(private apiService: ApiService, private snackBar: MatSnackBar,public printService: PrintService) {
    this.apiService.notification$.subscribe(message => {
      this.snackBar.open(message);
    });
  }



  onPrintInvoice() {
    const invoiceIds = ['101'];
    this.printService
      .printDocument('invoice', invoiceIds);
  }
  ngOnInit() {
    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }
}
