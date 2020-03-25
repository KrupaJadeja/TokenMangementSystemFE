import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers } from '@angular/http';
import { UserService } from './user.service';


@Injectable()
export class UserProfileService {
  private baseUrl = 'http://localhost:8080';

  headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http,
    private userService: UserService) { }

  uploadFile(file: File, user: User): Promise<any> {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.userService.token
    });
    let url = this.baseUrl + "/userprofile/upload/" + user.id;
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.http.post(url, formdata, { headers: headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  uploadFileInServer(file: File, user): Promise<any> {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.userService.token
    });
    let url = this.baseUrl + "/userprofile/server";
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('user', user);
    return this.http.post(url, formdata, { headers: headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getUserProfileById(id: number) {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.userService.token
    });
    return this.http.get(this.baseUrl + '/userprofile/getFileFromServer/' + id, { headers: headers })
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}