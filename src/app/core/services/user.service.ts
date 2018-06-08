import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ResponseApi} from '../../model/response';
import {Api} from './api.base'
import {User} from '../../model/user';

@Injectable()
export class UserService extends Api<ResponseApi<User>> { 
  constructor(public http: HttpClient) {
       super(http);
  }

  public saveUserInfo(data: any): Observable<ResponseApi<User>> {
    return this.post('/api/users', { name: 'ddd' });
  }

  public getUserInfo(): Observable<ResponseApi<User>> {
    return this.get('/api/users');
  }
}
