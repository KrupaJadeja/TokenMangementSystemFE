

import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';



@Injectable()
export class ConfirmService {

  private dialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(private dialog: MatDialog) { }

  public confirm(title: string, message: string): Observable<any> {

    this.dialogRef = this.dialog.open(ConfirmDialogComponent);
    this.dialogRef.componentInstance.title = title;
    this.dialogRef.componentInstance.message = message;

    return this.dialogRef.afterClosed();

  }
}