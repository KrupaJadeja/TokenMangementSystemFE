import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from "@angular/http";
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { UpdateUserPasswordRequest } from '../_payload/updateUserPasswordRequest';
import { Department } from '../_models/department';

@Injectable()
export class DepartmentService {
  private baseUrl = 'http://localhost:8080';
  user: User;
  token: String;
  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http,
    private router: Router) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.token = JSON.parse(sessionStorage.getItem('token'));
  }

  getDepartmentById(id: number): Promise<any> {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.baseUrl + '/department/' + id, { headers: headers })
      .toPromise()
      .then(response => response.json() as Department)
      .catch(this.handleError);
  }

  getDepartments(): Promise<any> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.baseUrl + '/department/findAll', { headers: headers })
      .toPromise()
      .then(response => response.json() as Department[])
      .catch(this.handleError);
  }

  addDepartment(department: Department): Promise<Department> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.baseUrl + '/department', department,{ headers: headers })
      .toPromise().
      then(response => response.json() as Department)
      .catch(this.handleError);
  }

  editDepartment(department: Department) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.put(this.baseUrl + '/department', department ,{ headers: headers })
      .toPromise().
      then(response => response)
      .catch(this.handleError);
  }

  deleteDepartment(department: Department) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.delete(this.baseUrl + '/department/' + department.id, { headers: headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}