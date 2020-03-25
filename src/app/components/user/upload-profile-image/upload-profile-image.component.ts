import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserProfileService } from 'src/app/_services/userProfile.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-upload-profile-image',
  templateUrl: './upload-profile-image.component.html',
  styleUrls: ['./upload-profile-image.component.css']
})
export class UploadProfileImageComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(
    private userProfileService: UserProfileService,
    private userService: UserService,
    private router: Router,
    public dialogRef: MatDialogRef<UploadProfileImageComponent>
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {

    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  onUpdateImage() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.userProfileService.uploadFile(this.currentFileUpload, this.userService.user)
      .then(data => {
        this.router.navigateByUrl('/menu', { skipLocationChange: false }).then(() => {
          this.dialogRef.close();
          this.router.navigate(['/admin']);
      });
      });
  }
}