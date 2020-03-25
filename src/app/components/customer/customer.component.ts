import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';
import { Customer } from 'src/app/_models/customer';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesService } from 'src/app/_services/message.service';
import { ConfirmService } from 'src/app/_services/confirm.service';

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
    private customerService: CustomerService,
    private messagesService: MessagesService,
    private confirmService: ConfirmService) { }

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
    const name = 'Delete ' + customer.name + '?';
    this.confirmService.confirm(name, 'This action is final. Gone forever!').pipe(
      switchMap(res => {if (res === true) {
        return  this.customerService.deleteCustomer(customer);
		}}))
      .subscribe(
        result => {
          this.success();
          // Refresh DataTable to remove row.
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
		 
        },
        (err: HttpErrorResponse) => {
          this.messagesService.openDialog('Error', 'Delete did not happen.');
        }
      );
  };

  edit(customer: Customer) {
    this.router.navigate(['/customer/edit',customer.id]);
  }

  private success() {
    this.messagesService.openDialog('Success', 'Database updated as you wished!');
  }
}