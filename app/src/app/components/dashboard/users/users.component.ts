import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActionConstants } from 'src/app/shared/utils/actionconstants';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'lastname',
    'email',
    'username',
    'role',
    'status',
    'update',
    'delete',
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  active: string;
  fileName: string = "Usuarios.pdf"

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  //Dependiendo de lo que se necesite, cambiamos el estatus del usuario
  //Con un solo clic
  changeStatus(_id: string) {
    this.userService.getUserById(_id).subscribe((data) => {
      if (data.status === 'inactivo') {
        this.active = 'activo';
        this.userService.activeDeactivateUser(data.id, this.active)
          .subscribe((info) => {
            this.authService.createActivityLog(ActionConstants.ACTIVO, ' Modulo usuarios')
            this.loadData();
          });
      } else {
        this.active = 'inactivo';
        this.userService.activeDeactivateUser(data.id, this.active)
          .subscribe((info) => {
            this.authService.createActivityLog(ActionConstants.INACTIVO, ' Modulo usuarios')
            this.loadData();
          });
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  //Mandamos a llamar la informacion de la tabla
  loadData() {
    this.userService.getAllUsers().subscribe((info) => {
      this.dataSource.data = info;
      this.dataSource.paginator = this.paginator;
    });
  }

  //Accion para eliminar el rol
  deleteUser(_id: string) {
    this.userService.deleteUser(_id).subscribe(
      (data) => {
        this.loadData();
        this.authService.createActivityLog(
          ActionConstants.BORRO_REGISTRO,
          ' Modulo usuarios'
        );
      },
      (error) => console.log(error)
    );
  }

  //Editar la informacion del rol
  updateUser(_id: string) {
    this.router.navigate(['/dashboard/update-user', _id]);
  }

  downloadUsersInfo(){
    this.userService.downloadUserReport().subscribe(data => {
      const blob = new Blob([data], {type: 'application/pdf'});
      const downloadFile = window.URL.createObjectURL(blob);
      FileSaver.saveAs(downloadFile, this.fileName);
    })
  }
}
