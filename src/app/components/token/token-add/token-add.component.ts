import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/_models/customer';
import { Department } from 'src/app/_models/department';
import { CustomerService } from 'src/app/_services/customer.service';
import { DepartmentService } from 'src/app/_services/department.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/_services/token.service';
import { MatCheckboxChange } from '@angular/material';
import { CounterService } from 'src/app/_services/counter.service';
import { Counter } from 'src/app/_models/counter';
import { TokenNumberService } from 'src/app/_services/tokennumber.service';

@Component({
  selector: 'app-token-add',
  templateUrl: './token-add.component.html',
  styleUrls: ['./token-add.component.css']
})
export class TokenAddComponent implements OnInit {
  customers : Customer[];
  departments : Department[];
  counters: Counter[];
  addTokenForm: FormGroup;
  loading = false;
  submitted = false;
  priproty = false;
  myVar= false;
  tokenNumber= 0;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private departmentService: DepartmentService,
    private tokenService: TokenService,
    private counterService: CounterService,
    private tokenNumberService:TokenNumberService) { }

  ngOnInit() {
    this.customerService.getCustomers()
      .then(cust => this.customers = cust);
    this.departmentService.getDepartments()
      .then(dept => this.departments = dept);
      this.counterService.getCounters()
      .then(counter => this.counters = counter);
    this.addTokenForm = this.formBuilder.group({
      customer: ['', Validators.required],
      department: ['', Validators.required],
      counter: [''],
      called: [''],
      tokenNumber: [''],
      priority: [''],
      createdDate: [''],
      recall:['']
    });
  }

  getPriority(event: MatCheckboxChange) {
    if (event.checked) {
      this.priproty = true;
    } else {
      this.priproty = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addTokenForm.invalid) {
      return;
    }
    this.loading = true;
    
    this.departments.forEach(dept => {
      if(this.addTokenForm.controls.department.value == dept.name){
        this.tokenNumberService.n += 1;
        this.addTokenForm.setValue({
          'customer': this.addTokenForm.controls.customer.value,
          'department': this.addTokenForm.controls.department.value,
          'priority': this.priproty,
          'counter': 'NIL',
          'createdDate': Date.now(),
          'called': 'No',
          'tokenNumber': dept.letter +'-'+ this.tokenNumberService.n,
          'recall': false
        });
      }
    });
   
    this.tokenService.addToken(this.addTokenForm.value)
      .then(
        data => {
          this.router.navigate(['/token',data.id]);
        },
        error => {
          this.loading = false;
        });
  }

}