import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { RoleName } from 'src/app/_models/role';

@Component({
  selector: 'app-change-admin-password',
  templateUrl: './change-admin-password.component.html',
  styleUrls: ['./change-admin-password.component.css']
})
export class ChangeAdminPasswordComponent implements OnInit {
  updatePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;
  
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.updatePasswordForm = this.formBuilder.group({
      newpassword: ['', Validators.required],
      confirmPwd: ['', Validators.required],
      user: [''],
    },
      {
        passwordMatchValidator
      });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
  passwordErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.updatePasswordForm.get('confirmPwd').touched && this.updatePasswordForm.invalid;
      return controlInvalid || formInvalid;
    }
  }

  confirmErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.updatePasswordForm.get('newpassword').touched && this.updatePasswordForm.invalid;
      return controlInvalid || formInvalid;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.updatePasswordForm.invalid) {
      return;
    }
    this.loading = true;
    this.updatePasswordForm.setValue({
      'newpassword': this.updatePasswordForm.controls.newpassword.value,
      'confirmPwd': this.updatePasswordForm.controls.confirmPwd.value,
      'user': this.userService.user
    });
    this.userService.changePassword(this.updatePasswordForm.value).then(
      data => {
        if (data != null) {
          if (this.userService.user.role === RoleName.Admin) {
            this.router.navigate(['/admin']);
          }
        }
      },
      error => {
        this.loading = false;
      });
  }

}
function passwordMatchValidator(g: FormGroup) {
  const password = g.get('password').value;
  const confirm = g.get('confirm').value
  return password === confirm ? null : { mismatch: true };
}
