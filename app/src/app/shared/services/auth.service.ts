import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth';
import { User } from '../models/user';
import { ActivityLogService } from './activity-log.service';
import { ActionsService } from './actions.service';
import { Action } from '../models/action';
import { ActivityLog } from '../models/activity-log';
import { DatePipe } from '@angular/common';
import { ActionConstants } from '../utils/actionconstants';
import { MailReq } from '../models/mailReq';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user: User
  private _token : string;

  //Datos para bitacora
  action: Action = new Action();
  userb: User = new User();
  activityLog: ActivityLog = new ActivityLog();
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  constructor(private httpClient: HttpClient, private router: Router,
    private activityLogService: ActivityLogService,
    private actionService: ActionsService,) {}

  login(auth: Auth): Observable<any>{
    return this.httpClient.post<any>(`${environment.apiUrl}/auth/login`, auth);
  }

  sendCodeToResetPassword(mailReq: MailReq): Observable<any>{
    return this.httpClient.post<any>(`${environment.apiUrl}/auth/restore`,mailReq);
  }

  checkinEmailToPass(email: string){
    return this.httpClient.post<any>(`${environment.apiUrl}/auth/reset-password`, email);
  }

  validateEmail(email: string): Observable<any>{
    return this.httpClient.get<any>(`${environment.apiUrl}/auth/validateMail/${email}`)
  }

  infoToMailSending(email: string): Observable<any>{
    return this.httpClient.post<any>(`${environment.apiUrl}/auth/confirm`, email);
  }


  
  //Este metodo mata la sesion y a su vez lo registra en la bitacora
  logout(): void {
      this._token = null;
      localStorage.clear();
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('status');
  }


  //Elimina local storage sin guardar en bitacora
  sessionKilled(){
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('status');
  }

  /**
   * Metodo para validar si el usuario estaba logeado 
   * previamente, de estarlo agarra el token activo y continua
   * la sesion
   */
  verifyLogged(): boolean{
    const token = localStorage.getItem('token');
    return !!token;
  }


  public get usuario(): User {
    if (this.user != null) {
      return this.user;
    } else if (this.user == null && localStorage.getItem('username') != null) {
      this.user = JSON.parse(localStorage.getItem('username')) as User;
      return this.user;
    }
    return new User();
  }

  //Funcionalidades de control sobre el Token de acceso
  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && localStorage.getItem('token') != null) {
      this._token = localStorage.getItem('token');
      return this._token;
    }
    return null;
  }


  //Validamos si el usuario logeado cuenta con un role
  hasRoles(roleInc: string): boolean{
    const rolename = localStorage.getItem('role');
    if(rolename === roleInc){
      return true;
    }
    return false;
  }


  createActivityLog(action: string, ubication?: string){
    this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss');
    //Mandamos a llamar la actividad buscandola por su nombre
    this.actionService.getActionByName(action).subscribe(action => {
         const username = localStorage.getItem('username');

        //Llenamos los datos del registro a bitacora
        this.activityLog.username = username;
        this,this.activityLog.date = this.todayWithPipe;
        this.activityLog.action = action;
        this.activityLog.change = action.description.toString() + ubication;

        //Guardamos los datos
        this.activityLogService.create(this.activityLog).subscribe(data =>{});
  }), error => console.log(error)
}
  createActivityLogToExit(action: string, ubication?: string){
    this.todayWithPipe = this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss');
    //Mandamos a llamar la actividad buscandola por su nombre
    this.actionService.getActionByName(action).subscribe(action => {
         const username = localStorage.getItem('username');

        //Llenamos los datos del registro a bitacora
        this.activityLog.username = username;
        this,this.activityLog.date = this.todayWithPipe;
        this.activityLog.action = action;
        this.activityLog.change = action.description.toString() + ubication;

        //Guardamos los datos
        this.activityLogService.create(this.activityLog).subscribe(data =>{
          this.sessionKilled();
        });
  }), error => console.log(error)
}


}
