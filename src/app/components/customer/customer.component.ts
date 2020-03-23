import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';
import { Customer } from 'src/app/_models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['customerNumber', 'name', 'contactNumber', 'age', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private router: Router,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers().then(customer => {
      this.listData = new MatTableDataSource(customer);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  deleteCustomer(customer: Customer): void {
    this.customerService.deleteCustomer(customer)
      .then(data => {
        console.log(data);
        this.customerService.getCustomers().then(customer => {
          this.listData = new MatTableDataSource(customer);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.listData.filterPredicate = (data, filter) => {
            return this.displayedColumns.some(ele => {
              return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
            });
          };
        });
      });
  };

  edit(customer: Customer) {
    this.router.navigate(['/customer/edit',customer.id]);
  }
}