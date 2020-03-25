import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DepartmentService } from 'src/app/_services/department.service';
import { Router } from '@angular/router';
import { Department } from 'src/app/_models/department';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { MessagesService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'letter', 'start', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private router: Router,
    private departmentService: DepartmentService,
    private messagesService: MessagesService,
    private confirmService: ConfirmService) { }

  ngOnInit() {
    this.departmentService.getDepartments().then(dept => {
      this.listData = new MatTableDataSource(dept);
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

  deleteUser(department: Department): void {
    const name = 'Delete ' + department.name + '?';
    this.confirmService.confirm(name, 'This action is final. Gone forever!').pipe(
      switchMap(res => {if (res === true) {
        return this.departmentService.deleteDepartment(department)
		}}))
      .subscribe(
        result => {
          this.success();
          // Refresh DataTable to remove row.
          this.departmentService.getDepartments().then(dept => {
          this.listData = new MatTableDataSource(dept);
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

  edit(department: Department) {
    this.router.navigate(['/department/edit',department.id]);
  }

  private success() {
    this.messagesService.openDialog('Success', 'Database updated as you wished!');
  }
}
