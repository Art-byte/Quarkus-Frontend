import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Action } from 'src/app/shared/models/action';
import { ActivityLog } from 'src/app/shared/models/activity-log';
import { Status } from 'src/app/shared/models/status';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StatusService } from 'src/app/shared/services/status.service';
import { ActionConstants } from 'src/app/shared/utils/actionconstants';
import { ErrorCreate, savedConfirmation } from 'src/app/shared/utils/alerts';

@Component({
  selector: 'app-create-status',
  templateUrl: './create-status.component.html',
  styleUrls: ['./create-status.component.css'],
})
export class CreateStatusComponent implements OnInit {
  status: Status = new Status();
  form: FormGroup;


  constructor(
    private statusService: StatusService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  save() {
    this.statusService.createStatus(this.status).subscribe(
      (data) => {
        this.status = new Status();
        savedConfirmation();
        this.authService.createActivityLog(ActionConstants.NUEVO_REGISTRO,'Modulo status');
        this.router.navigate(['/dashboard/status']); // Lista de status
      },
      (error) =>{
        ErrorCreate('Error al crear el status');
        this.router.navigate(['/dashboard/status']);
      }
    );
  }
}
