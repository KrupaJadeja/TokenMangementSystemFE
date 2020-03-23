import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Department } from 'src/app/_models/department';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/app/_services/department.service';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {
  editDepartment: FormGroup;
  loading = false;
  submitted = false;
  dept_id: number;
  department: Department;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService) { }

  ngOnInit() {
    this.dept_id = +this.route.snapshot.paramMap.get('id');
    this.editDepartment = this.formBuilder.group({
      name: ['', Validators.required],
      letter: ['', Validators.required],
      start: ['', [Validators.required, Validators.email]],
      color: ['', Validators.required],
    });
    this.initForm();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editDepartment.invalid) {
      return;
    }

    this.loading = true;
    this.departmentService.editDepartment(this.editDepartment.value)
      .then(
        data => {
          this.router.navigate(['/department/list']);
        },
        error => {
          this.loading = false;
        });
  }

  private initForm() {
    this.departmentService.getDepartmentById(this.dept_id).then(data => {
      if (data != null) {
        this.editDepartment = new FormGroup({
          'id': new FormControl(data.id),
          'name': new FormControl(data.name, Validators.required),
          'letter': new FormControl(data.letter, Validators.required),
          'start': new FormControl(data.start, Validators.required),
          'color': new FormControl(data.color)
        });
      }
    });
  }
}
