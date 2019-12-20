// import { Component, OnInit } from '@angular/core';
// import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
// import { ProductService } from 'src/app/product.service';
// @Component({
//   selector: 'app-add-product',
//   templateUrl: './add-product.component.html',
//   styleUrls: ['./add-product.component.css']
// })
// export class AddProductComponent implements OnInit {
//   angForm: FormGroup;
//   constructor(private fb: FormBuilder , private productService:ProductService) {
//     this.createForm();
//    }
//   createForm() {
//     this.angForm = this.fb.group({
//       productName: ['', Validators.required ],
//       price: ['', Validators.required ],
//       quantity: ['', Validators.required ]
//     });
//   }
//   ngOnInit() {
//   }
 
//   addProduct(){
// console.log(this.angForm.value)
// this.productService.addProduct(this.angForm.value);
//   }

  

// }

import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
 import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductService } from 'src/app/product.service';
export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  @ViewChild('resetProductForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  productForm: FormGroup;
  subjectArray: Subject[] = [];
  typesProduct: any = ['Tablets', 'Syrup', 'Capsule','oinments'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private productApi: ApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.productForm = this.fb.group({
      product_name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      type: ['', [Validators.required]]
      // subjects: [this.subjectArray],
      // dob: ['', [Validators.required]],
      // gender: ['Male']
    })
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }  

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.productForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitProductForm() {
    if (this.productForm.valid) {
      console.log(this.productForm.value)
      this.productApi.AddProduct(this.productForm.value).subscribe(res => {
        this.productApi.notification$.next('Added Successfully');
        this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
      });
    }
  }

}
