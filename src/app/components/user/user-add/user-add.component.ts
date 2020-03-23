import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  roles = ['Staff', 'Token', 'Customer'];
  registerUsers: FormGroup;
  loading = false;
  submitted = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerUsers = this.formBuilder.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required],
      confirmPwd: ['', Validators.required]
    },
      {
        passwordMatchValidator
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerUsers.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerUsers.invalid) {
      return;
    }

    this.loading = true;
    this.authService.createUser(this.registerUsers.value)
      .then(
        data => {
          this.router.navigate(['/user/list']);
        },
        error => {
          this.loading = false;
        });
  }

  
  passwordErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.registerUsers.get('confirmPwd').touched && this.registerUsers.invalid;
      return controlInvalid || formInvalid;
    }
  }

  confirmErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      const controlInvalid = control.touched && control.invalid;
      const formInvalid = control.touched && this.registerUsers.get('password').touched && this.registerUsers.invalid;
      return controlInvalid || formInvalid;
    }
  }

}
function passwordMatchValidator(g: FormGroup) {
  const password = g.get('password').value;
  const confirm = g.get('confirm').value
  return password === confirm ? null : { mismatch: true };
}