import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Status } from '../models/status';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {}


  getAllStatus(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/status`);
  }

  getStatusById(_id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/status/${_id}`);
  }


  createStatus(status: Status): Observable<Status> {
    return this.httpClient
      .post<Status>(`${environment.apiUrl}/status`, status, this.httpOptions)
      .pipe(
        tap((newStatus: Status) =>
          this.log(`Added new Status with id=${status._id}`)
        ),
        catchError(this.handleError<Status>('add status'))
      );
  }

  updateStatus(_id: string, value: any): Observable<Object> {
    return this.httpClient.put(`${environment.apiUrl}/status/${_id}`, value);
  }

  deleteStatus(_id: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/status/${_id}`, {
      responseType: 'text',
    });
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
