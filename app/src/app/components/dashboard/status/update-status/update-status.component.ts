import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from 'src/app/shared/models/status';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StatusService } from 'src/app/shared/services/status.service';
import { ActionConstants } from 'src/app/shared/utils/actionconstants';
import { changeConfirmation, ErrorUpdate } from 'src/app/shared/utils/alerts';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css'],
})
export class UpdateStatusComponent implements OnInit {
  _id: string;
  status: Status;
  form: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statusService: StatusService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.status = new Status();
    this._id = this.route.snapshot.params['_id'];

    this.statusService.getStatusById(this._id).subscribe(
      (data) => {
        this.status = data;
      },
      (error) => console.log(error)
    );
  }

  updateStatus() {
    this.statusService.updateStatus(this._id, this.status).subscribe(
      (data) => {
        console.log(data);
        this.status = new Status();
        changeConfirmation();
        this.authService.createActivityLog(ActionConstants.EDITO_REGISTRO, 'Modulo status');
        this.router.navigate(['/dashboard/status']);
      },
      (error) => {
        ErrorUpdate('Error al editar el status');
        this.router.navigate(['/dashboard/status']);
      }
    );
  }

}
