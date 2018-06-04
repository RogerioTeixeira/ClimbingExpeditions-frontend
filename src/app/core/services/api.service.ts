import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ResponseApi} from '../../model/response';
import {User} from '../../model/user';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  public saveUserInfo(data: any): Observable<ResponseApi<User>> {
    return this.http.post<ResponseApi<User>>('http://localhost:3000/api/users', { name: 'ddd' });
  }
}
