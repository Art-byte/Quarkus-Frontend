import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { ActionConstants } from 'src/app/shared/utils/actionconstants';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  //Para que aparezca en la tabla, tiene que estar aqui primero el campo para que hagan match
  displayedColumns: string[] = ['id', 'name', 'update', 'delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private roleService: RoleService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.roleService.getAllRoles().subscribe((info) => {
      this.dataSource.data = info
      this.dataSource.paginator = this.paginator;
    });
  }

  //Accion para eliminar el rol
  deleteRole(_id: string) {
    this.roleService.deleteRole(_id).subscribe(
      (data) => {
        this.loadData();
        this.authService.createActivityLog(ActionConstants.BORRO_REGISTRO, 'Modulo roles');
      },
      (error) => console.log(error)
    );      
  }

  //Editar la informacion del rol
  updateRole(_id: string) {
    this.router.navigate(['/dashboard/update-role', _id]);
  }
}
