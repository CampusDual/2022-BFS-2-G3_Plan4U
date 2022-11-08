import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { API_CONFIG } from '../shared/api.config';
import { environment } from 'src/environments/environment';
import { AnyPageFilter } from '../model/rest/filter';
import { DataSourceRESTResponse } from '../model/rest/response';
import { CreatePublicationRequest, EditPublicationRequest } from '../model/rest/request';
import { Buffer } from 'buffer';
import { Publication } from '../model/publication';
import { Category } from '../model/category';
import { Province } from '../model/province';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http: HttpClient) { }

  public getPublications(pageFilter: AnyPageFilter): Observable<DataSourceRESTResponse<Publication[]>> {
    const url = API_CONFIG.getPublications;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      // Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.post<DataSourceRESTResponse<Publication[]>>(url, pageFilter, { headers });
  }

  public getPublication(id: number): Observable<Publication> {
    const url = API_CONFIG.getPublication;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Publication>(url, { params, headers });
  }

  public createPublication(publication: Publication): Observable<any> {
    const url = API_CONFIG.createPublication;
    const body: CreatePublicationRequest = new CreatePublicationRequest(publication);
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.post<Publication>(url, body, { headers }).pipe(
      catchError(e =>{
        return throwError(()=>e);
      })
    );
  }

  public editPublication(publication: Publication): Observable<any> {
    const url = API_CONFIG.editPublication;
    const body: EditPublicationRequest = new EditPublicationRequest(publication);
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

  public deletePublication(id: number): Observable<any> {
    const url = API_CONFIG.deletePublication;
    const headers = new HttpHeaders({
      'Content-type': 'charset=utf-8',
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<any>(url, { params, headers });
  }


  public getCategories(): Observable<Category[]> {
    const url = API_CONFIG.getCategories;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      // Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.get<Category[]>(url, { headers });
  }

  public getProvinces(): Observable<Province[]> {
    const url = API_CONFIG.getProvinces;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      // Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.get<Province[]>(url, { headers });
  }


  public getPublicationsUsers(): Observable<Publication[]> {
    const url = API_CONFIG.getPublications;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=utf-8',
      // Authorization: 'Basic ' + btoa(`${environment.clientName}:${environment.clientSecret}`),
      Authorization: 'Basic ' + Buffer.from(`${environment.clientName}:${environment.clientSecret}`, 'utf8').toString('base64'),
    });
    return this.http.get<Publication[]>(url, { headers });
  }

}
