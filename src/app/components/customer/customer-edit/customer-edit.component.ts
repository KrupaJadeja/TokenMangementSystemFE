import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  editCustomerForm: FormGroup;
  loading = false;
  submitted = false;
  customer_id: number;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.customer_id = +this.route.snapshot.paramMap.get('id');
    this.editCustomerForm = this.formBuilder.group({
      customerNumber: ['', Validators.required],
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      age: ['', Validators.required]
    });
    this.initForm();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editCustomerForm.invalid) {
      return;
    }

    this.loading = true;
    this.customerService.editCustomer(this.editCustomerForm.value)
      .then(
        data => {
          this.router.navigate(['/customer/list']);
        },
        error => {
          this.loading = false;
        });
  }

  private initForm() {
    this.customerService.getCustomerById(this.customer_id).then(data => {
      if (data != null) {
        this.editCustomerForm = new FormGroup({
          'id': new FormControl(data.id),
          'customerNumber': new FormControl(data.customerNumber, Validators.required),
          'name': new FormControl(data.name, Validators.required),
          'contactNumber': new FormControl(data.contactNumber, Validators.required),
          'age': new FormControl(data.age, Validators.required)
        });
      }
    });
  }
}