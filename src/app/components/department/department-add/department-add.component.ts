import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { DepartmentService } from 'src/app/_services/department.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {
  addDepartment: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private departmentService: DepartmentService) { }

  ngOnInit() {
    this.addDepartment = this.formBuilder.group({
      name: ['', Validators.required],
      letter: ['', Validators.required],
      start: ['', Validators.required],
      color: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addDepartment.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addDepartment.invalid) {
      return;
    }

    this.loading = true;
    this.departmentService.addDepartment(this.addDepartment.value)
      .then(
        data => {
          this.router.navigate(['/customer/list']);
        },
        error => {
          this.loading = false;
        });
  }
}