import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  roles = ['Admin','Staff', 'Token', 'Customer'];
  editUserForm: FormGroup;
  loading = false;
  submitted = false;
  user_id: number;
  user: User;
  selectedRole;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.user_id = +this.route.snapshot.paramMap.get('id');
    this.editUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
    this.initForm();
  }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editUserForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.editUsers(this.editUserForm.value)
      .then(
        data => {
          this.router.navigate(['/user/list']);
        },
        error => {
          this.loading = false;
        });
  }

  private initForm() {
    this.userService.getUserById(this.user_id).then(data => {
      if (data != null) {
        this.editUserForm = new FormGroup({
          'id': new FormControl(data.id),
          'name': new FormControl(data.name, Validators.required),
          'userName': new FormControl(data.userName, Validators.required),
          'email': new FormControl(data.email, Validators.required),
          'role': new FormControl(data.role)
        });
        if(data.role == this.roles[0]){
          this.selectedRole = this.roles[0];
        }else if(data.role == this.roles[1]){
          this.selectedRole = this.roles[1];
        }else if(data.role == this.roles[2]){
          this.selectedRole = this.roles[2];
        }else{
          this.selectedRole = this.roles[3];
        }
      }
    });
  }
}