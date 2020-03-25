import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesService } from 'src/app/_services/message.service';
import { ConfirmService } from 'src/app/_services/confirm.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'userName', 'email', 'role', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private router: Router,
    private userService: UserService,
    private messagesService: MessagesService,
    private confirmService: ConfirmService) { }

  ngOnInit() {
    this.userService.getOnlyUsers().then(users => {
      this.listData = new MatTableDataSource(users);
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

  deleteUser(user: User): void {
    const name = 'Delete ' + user.name + '?';
    this.confirmService.confirm(name, 'This action is final. Gone forever!').pipe(
      switchMap(res => {
        if (res === true) {
          return this.userService.deleteUser(user)
        }
      }))
      .subscribe(
        result => {
          this.success();
          // Refresh DataTable to remove row.
          this.userService.getOnlyUsers().then(users => {
            this.listData = new MatTableDataSource(users);
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

  edit(user: User) {
    this.router.navigate(['/user/edit', user.id]);
  }

  changePwd(user: User) {
    this.router.navigate(['/user/changepwd', user.id]);
  }

  private success() {
    this.messagesService.openDialog('Success', 'Database updated as you wished!');
  }

}