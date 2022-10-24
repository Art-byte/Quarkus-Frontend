import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {}

  getAllRoles(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/roles`);
  }

  getRole(_id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/roles/${_id}`);
  }


  createRole(role: Role): Observable<Role> {
    return this.httpClient
      .post<Role>(`${environment.apiUrl}/roles`, role, this.httpOptions)
      .pipe(
        tap((newRole: Role) => this.log(`Added new role with id=${role._id}`)),
        catchError(this.handleError<Role>('add role'))
      );
  }

  updateRole(_id: string, value: any): Observable<Object> {
    return this.httpClient.put(`${environment.apiUrl}/roles/${_id}`, value);
  }


  deleteRole(_id: string): Observable<any>{
    return this.httpClient.delete(`${environment.apiUrl}/roles/${_id}`, {responseType: 'text'});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };

  private log(message: string) {
    this.messageService.addMessage(message);
  }
}
