import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private messageService: MessageService
  ) {}

  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/users`);
  }

  getUserById(_id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/users/${_id}`);
  }

  getUsername(username: string): Observable<any> {
    return this.httpClient.get(
      `${environment.apiUrl}/users/username/${username}`
    );
  }
  blockUser(_id: string, value: any): Observable<any> {
    return this.httpClient.put(
      `${environment.apiUrl}/users/blocked/${_id}`,
      value
    );
  }
  activeDeactivateUser(_id: string, status: string): Observable<any> {
    return this.httpClient.put(
      `${environment.apiUrl}/users/changeStat/${_id}`,
      status
    );
  }

  createUser(user: User, _id: string): Observable<User> {
    return this.httpClient
      .post<User>(
        `${environment.apiUrl}/users/role/${_id}`,
        user,
        this.httpOptions
      )
      .pipe(
        tap((newStatus: User) =>
          this.log(`Added new Status with id=${user._id}`)
        ),
        catchError(this.handleError<User>('add status'))
      );
  }

  updateUser(_id: string, user: any, idRole: string): Observable<Object> {
    return this.httpClient.put(
      `${environment.apiUrl}/users/${_id}/newRole/${idRole}`,
      user
    );
  }

  updateProfile(_id: string, user: any): Observable<Object> {
    return this.httpClient.put(
      `${environment.apiUrl}/users/profile/${_id}`,
      user
    );
  }

  deleteUser(_id: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/users/${_id}`, {
      responseType: 'text',
    });
  }

  updatePassword(
    _id: string,
    password: string,
    confirmPass: string,
    value: any
  ): Observable<Object> {
    return this.httpClient.put(
      `${environment.apiUrl}/users/update-password/${_id}/${password}/${confirmPass}`,
      value,
      { responseType: 'text' }
    );
  }


  uploadProfilePhoto(file: File, userId:string): Observable<any>{
    const formData = new FormData();
    formData.append('file', file)
    return this.httpClient.post<any>(`${environment.apiUrl}/users/files/newPhoto/upload/${userId}`, formData,  
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Disposition": "form-data"
        }
      });
  }


  downloadUserReport(): Observable<Blob> {
    return this.httpClient.get(`${environment.apiUrl}/users/report/pdf`, {
      responseType: 'blob',
    });
  }

  //Descargar foto de perfil;
  downloadImage(photoName: string) {
    return this.httpClient.get(
      `${environment.apiUrl}/users/download/photoProfile/multimedia/part/${photoName}`,
      { responseType: 'blob' }
    );
  }

  downloadUserManual(userManual: string) {
    return this.httpClient.get(
      `${environment.apiUrl}/users/download/manual/multimedia/part/usermanual/again/${userManual}`,
      { responseType: 'blob' }
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };

  private log(message: string) {
    this.messageService.addMessage(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
