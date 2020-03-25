import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { CounterService } from 'src/app/_services/counter.service';
import { Counter } from 'src/app/_models/counter';
import { MessagesService } from 'src/app/_services/message.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'letter', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private router: Router,
    private counterService: CounterService,
    private messagesService: MessagesService,
    private confirmService: ConfirmService) { }

  ngOnInit() {
    this.counterService.getCounters().then(counter => {
      this.listData = new MatTableDataSource(counter);
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

  deleteCounter(counter: Counter): void {
    const name = 'Delete ' + counter.name + '?';
    this.confirmService.confirm(name, 'This action is final. Gone forever!').pipe(
      switchMap(res => {if (res === true) {
        return this.counterService.deleteCounter(counter);
		}}))
      .subscribe(
        result => {
          this.success();
          // Refresh DataTable to remove row.
          this.counterService.getCounters().then(counter => {
          this.listData = new MatTableDataSource(counter);
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

  edit(counter: Counter) {
    this.router.navigate(['/counter/edit',counter.id]);
  }

  private success() {
    this.messagesService.openDialog('Success', 'Database updated as you wished!');
  }

}
