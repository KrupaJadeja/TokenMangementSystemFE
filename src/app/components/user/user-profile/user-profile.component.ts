import { Component, OnInit } from '@angular/core';
import { RoleName } from 'src/app/_models/role';
import { NavigationEnd, Router } from '@angular/router';
import { UploadProfileImageComponent } from '../upload-profile-image/upload-profile-image.component';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { MatDialog } from '@angular/material';
import { UserProfileService } from 'src/app/_services/userProfile.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  imgsrc;

  private uploadProfileImageComponent = UploadProfileImageComponent;

  constructor(private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private userProfileService: UserProfileService,
    public _DomSanitizationService: DomSanitizer) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router = null;
      }
    });
    this.userProfileService.getUserProfileById(this.userService.user.id)
      .then(data => {
        this.imgsrc = data._body
      });
  }

  transform() {
    return this._DomSanitizationService.bypassSecurityTrustResourceUrl(this.imgsrc);
  }

  public editProfile() {
    this.router.navigate(['/user/edit', this.userService.user.id]);
  }

  public uploadImage() {
    this.dialog.open(this.uploadProfileImageComponent);
  }
}