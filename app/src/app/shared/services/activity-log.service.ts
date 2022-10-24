import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActivityLog } from '../models/activity-log';

@Injectable({
  providedIn: 'root',
})
export class ActivityLogService {
  constructor(private httpClient: HttpClient) {}

  getActivityLog(): Observable<ActivityLog[]> {
    return this.httpClient.get<ActivityLog[]>(
      `${environment.apiUrl}/activityLog`
    );
  }

  create(activityLog: ActivityLog): Observable<ActivityLog> {
    return this.httpClient
      .post(`${environment.apiUrl}/activityLog`, activityLog)
      .pipe(
        map((response: any) => response.activityLog as ActivityLog),
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          if (e.error.message) {
            console.error(e.error.message);
          }
          return throwError(e);
        })
      );
  }
}
