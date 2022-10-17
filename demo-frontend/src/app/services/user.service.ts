import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUserRequest } from '../model/rest/request';
import { EditUserRequest } from '../model/rest/request';
import { User } from '../model/user';
import { API_CONFIG } from '../shared/api.config';
import { Buffer } from "buffer";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUser(login: string): Observable<User> {
    const url = API_CONFIG.getUser;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    const params = new HttpParams().set('login', login);
    return this.http.get<User>(url, { params, headers });
  }

  public createUser(user: User): Observable<any> {
    const url = API_CONFIG.createUser;
    const body: CreateUserRequest = new CreateUserRequest(user);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
     // Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.post<User>(url, body, { headers }).pipe(
      catchError(e =>{
        return throwError(()=>e);
      })
    );
  }

  public editUser(user: User): Observable<any> {
    const url = API_CONFIG.editUser;
    const body: EditUserRequest = new EditUserRequest(user);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.post<any>(url, body, { headers }).pipe(
      catchError((e:HttpErrorResponse) =>{
        return throwError(()=>e);
      })
    );
  }
}
