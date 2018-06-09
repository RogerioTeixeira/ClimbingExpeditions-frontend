import { HttpHeaders, HttpClient, HttpParams , HttpErrorResponse} from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators/catchError';
import { Observable } from 'rxjs';
import {ApiHandlerError} from '../error';
import {FirebaseHandlerError} from '../error/firebase-error';
export class Api<T> {
  constructor(protected http: HttpClient) {}

  private formatErrors(error: HttpErrorResponse) {
    return ErrorObservable.create(new ApiHandlerError(error));
  }

  protected get(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http
      .get<T>(`${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  }

  protected post(path: string, body: Object = {}): Observable<T> {
    return this.http
      .post<T>(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }
}
