import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Action } from 'src/app/shared/models/action';
import { ActivityLog } from 'src/app/shared/models/activity-log';
import { User } from 'src/app/shared/models/user';
import { ActivityLogService } from 'src/app/shared/services/activity-log.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css'],
})
export class ActivityLogComponent implements OnInit {
  displayedColums: string[] = ['id', 'username', 'ip', 'date', 'action', 'change'];
  dataSource = new MatTableDataSource();
  activityLog: ActivityLog[];
  action: Action[] = [];
  user: User[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private activityLogService: ActivityLogService) {}

  ngOnInit(): void {
    this.loadActivityLog();
  }

  loadActivityLog() {
    this.activityLogService.getActivityLog().subscribe(response => {
      this.dataSource.data = response;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
      );
  }
  
}
