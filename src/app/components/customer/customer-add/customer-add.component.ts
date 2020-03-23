import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  addCustomerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.addCustomerForm = this.formBuilder.group({
      customerNumber: ['', Validators.required],
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addCustomerForm.invalid) {
      return;
    }

    this.loading = true;
    this.customerService.addCustomer(this.addCustomerForm.value)
      .then(
        data => {
          this.router.navigate(['/customer/list']);
        },
        error => {
          this.loading = false;
        });
  }

}
