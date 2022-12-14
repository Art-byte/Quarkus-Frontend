import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(private httpClient: HttpClient) { }

  getActionByName(actionName: string): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/actions/nameAction/${actionName}`)
  }
}
