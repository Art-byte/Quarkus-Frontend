import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Action } from 'src/app/shared/models/action';
import { ActivityLog } from 'src/app/shared/models/activity-log';
import { User } from 'src/app/shared/models/user';
import { ActionsService } from 'src/app/shared/services/actions.service';
import { ActivityLogService } from 'src/app/shared/services/activity-log.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StatusService } from 'src/app/shared/services/status.service';
import { ActionConstants } from 'src/app/shared/utils/actionconstants';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  //Objetos del componente de tabla
  displayedColumns: string[] = ['id', 'name', 'date', 'update', 'delete'];
  dataSource = new MatTableDataSource();

  //Instancias de clases
  action: Action = new Action();
  activityLog: ActivityLog = new ActivityLog();
  user: User = new User();

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private statusService: StatusService,
    private router: Router,
    private activityLogService: ActivityLogService,
    private actionService: ActionsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  deleteStatus(_id: string) {
    this.statusService.deleteStatus(_id).subscribe(
      (data: any) => {
        this.authService.createActivityLog(ActionConstants.BORRO_REGISTRO, 'Modulo status');
        this.loadData();
      },
      (error) => console.log(error));
  }

  loadData() {
    this.statusService.getAllStatus().subscribe((info: any) => {
      this.dataSource.data = info;
      this.dataSource.paginator = this.paginator;
    });
  }

  updateStatus(_id: string) {
    this.router.navigate(['/dashboard/update-status', _id]);
  }

}
