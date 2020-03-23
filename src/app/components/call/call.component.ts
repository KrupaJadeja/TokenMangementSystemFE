import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Customer } from 'src/app/_models/customer';
import { Department } from 'src/app/_models/department';
import { Counter } from 'src/app/_models/counter';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { CustomerService } from 'src/app/_services/customer.service';
import { DepartmentService } from 'src/app/_services/department.service';
import { TokenService } from 'src/app/_services/token.service';
import { CounterService } from 'src/app/_services/counter.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Token } from 'src/app/_models/token';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { filter } from 'rxjs/operators';
import { MessagesService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {
  users: User[];
  departments: Department[];
  counters: Counter[];
  callTokenForm: FormGroup;
  loading = false;
  submitted = false;
  priproty = false;
  myVar = false;
  token: Token[];

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['department', 'tokenNumber', 'called', 'priority', 'counter', 'recall'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private departmentService: DepartmentService,
    private tokenService: TokenService,
    private counterService: CounterService,
    private messagesService: MessagesService) { }

  ngOnInit() {
    this.userService.getusers()
      .then(user => this.users = user);
    this.departmentService.getDepartments()
      .then(dept => this.departments = dept);
    this.counterService.getCounters()
      .then(counter => this.counters = counter);
    this.callTokenForm = this.formBuilder.group({
      assigned_user: ['', Validators.required],
      department: ['', Validators.required],
      counter: ['', Validators.required]
    });

    this.tokenService.getTokensByPriority().then(token => {
      this.token = token;
      this.listData = new MatTableDataSource(token);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'recall' && data[ele].toLowerCase().indexOf(filter) != -1;
        });
      };
    });
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {

    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onSubmit() {
    this.tokenService.editCalledToken(this.callTokenForm.value)
      .then(data => {
        if (data["_body"] == "Error") {
          this.messagesService.openDialog('No Matching Token Found', 'Please try other Department');
        } else {
          this.tokenService.getTokensByPriority().then(token => {
            this.token = token;
            this.listData = new MatTableDataSource(token);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
            this.listData.filterPredicate = (data, filter) => {
              return this.displayedColumns.some(ele => {
                return ele != 'recall' && data[ele].toLowerCase().indexOf(filter) != -1;
              });
            };
          });
          this.messagesService.openDialog('Token Called', '');
        }
      });
  }

  delete() {
    this.tokenService.deleteTokenByDepartment(this.callTokenForm.value)
      .then(data => {
        if (data["_body"] == "Error") {
          this.messagesService.openDialog('No Matching Token Found', 'Please try other Department or counter');
        } else {
          this.tokenService.getTokensByPriority().then(token => {
            this.token = token;
            this.listData = new MatTableDataSource(token);
            this.listData.sort = this.sort;
            this.listData.paginator = this.paginator;
            this.listData.filterPredicate = (data, filter) => {
              return this.displayedColumns.some(ele => {
                return ele != 'recall' && data[ele].toLowerCase().indexOf(filter) != -1;
              });
            };
          });
          this.messagesService.openDialog('Token Stoped', '');
        }
      });
  }

  recall(){
    this.messagesService.openDialog('Token Called', '');
  }
}