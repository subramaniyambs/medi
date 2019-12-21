import { Router,ActivatedRoute  } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
 import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
export interface Subject {
  name: string;
}
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

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
  // example = { product_name: '', price: '' };
  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private productApi: ApiService,
    private router: Router,
    private ngZone: NgZone
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.productApi.GetProduct(id).subscribe(data => {
      // console.log(data.subjects)
      // this.subjectArray = data.subjects;
      this.productForm = this.fb.group({
        product_name: [data.product_name, [Validators.required]],
        price: [data.price, [Validators.required]],
        quantity: [data.quantity, [Validators.required]],
        type: [data.type],
        batch: [data.batch, [Validators.required]],
        expDate: [data.expDate, [Validators.required]],
        SGST: [data.SGST, [Validators.required]],
        GST: [data.GST, [Validators.required]],
        hsn: [data.hsn, [Validators.required]]
        
      })      
    })    
  }

  /* Reactive book form */
  submitBookForm() {
    this.productForm = this.fb.group({
      product_name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      type: ['', [Validators.required]],
      batch: ['', [Validators.required]],
        expDate: ['', [Validators.required]],
        SGST: ['', [Validators.required]],
        GST: ['', [Validators.required]],
        hsn: ['', [Validators.required]]
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
      var id = this.actRoute.snapshot.paramMap.get('id');
      this.productApi.UpdateProduct(id,this.productForm.value).subscribe(res => {
        this.productApi.notification$.next('Added Successfully');
        this.ngZone.run(() => this.router.navigateByUrl('/products-list'))
      });
    }
  }

}
