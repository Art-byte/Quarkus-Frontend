import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { ActionConstants, Constants } from 'src/app/shared/utils/actionconstants';
import {
  changeProdfilePhotoConfirmation,
  PasswordRepetido,
  updatedConfirmation,
  updatedProfile,
} from 'src/app/shared/utils/alerts';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  form: FormGroup;
  formPassword: FormGroup;
  formUploadPhoto: FormGroup;
  userProfile = localStorage.getItem('username');
  _id: string;

  //--------
  selectedFile: File;
  userIdResp: string
  profilePicture: string
  //--------

  color: ThemePalette = 'accent';
  checked = false;
  showDetails: boolean = false;
  urlEndPoint = environment.apiUrl;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService,
    private httpClient:HttpClient
  ) {
    //formulario de informacion del perfil
    this.form = this.formBuilder.group({
      name: [''],
      lastName: [''],
      username: [''],
      email: [''],
      phone: [''],
    });

    //formulario de cambio de password
    this.formPassword = this.formBuilder.group({
        newPassword: ['',[Validators.required, Validators.pattern(new RegExp(Constants.pattertPassword)),],],
        confirmPassword: ['', Validators.required],
      },{ validators: this.IsEquals('newPassword', 'confirmPassword'),});

    this.formUploadPhoto = this.formBuilder.group({
      file: ['', Validators.required],
      fileSource: ['', Validators.required]
    });

    
  }

//================================================================================================================================
get f(){
  return this.formUploadPhoto.controls;
}

onFileChange(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.formUploadPhoto.patchValue({
      fileSource: file
    });
  }
}

userId: string;
submit() {
const username = localStorage.getItem('username');
this.userService.getUsername(username).subscribe(data => {
  this.userId = data.id;
  this.userService.uploadProfilePhoto(this.formUploadPhoto.get('fileSource').value , this.userId).subscribe(data =>{
    console.log('esta entrando')
  });

});


// submit(){
//   
//   formData.append('file', this.myForm.get('fileSource').value);
 
//   this.http.post('http://localhost:8001/upload.php', formData)
//     .subscribe(res => {
//       console.log(res);
//       alert('Uploaded Successfully.');
//     })
// }

}



//================================================================================================================================

  

  onStrengthChangeds(strength: number) {}

  // Gets para devolver los valores de los campos del fomulario de cambiar la contraseña
  get newPassword() {
    return this.formPassword.get('newPassword');
  }
  get confirmPassword() {
    return this.formPassword.get('confirmPassword');
  }

  IsEquals(pNewPassword, pConfirmPassword) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pNewPassword);
      const pass2Control = formGroup.get(pConfirmPassword);
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }

  /**
   * Al iniciar el componente, nos carga
   * la informacion del usuario que se encuentra logeado
   */
  ngOnInit(): void {
    this.getUserInfo();
  }

  updateUserPassword() {
    const username = localStorage.getItem('username');
    this.userService.getUsername(username).subscribe((resp) => {
      this.userService.updatePassword(resp.id, this.newPassword.value, this.confirmPassword.value, resp).subscribe((data) => {
        if(resp.status === 'primer acceso'){
          this.rebootSession("VUELVE A INICIAR SESIÓN","Ahora que has cambiado tu password tienes que volver a iniciar sesión");
        }else{
          updatedConfirmation();
          this.formPassword.reset();
          this.router.navigate(['dashboard']);
        }

        this.authService.createActivityLog(ActionConstants.CAMBIO_DE_CONTRASEÑA, ' Modulo perfil');

        }, error => {
          PasswordRepetido();
        });
    });
  }


  // this.rebootSession("VUELVE A INICIAR SESIÓN",
  // "Ahora que has cambiado tu password tienes que volver a iniciar sesión")

  updateProfile() {
    const username = localStorage.getItem('username');
    this.userService.getUsername(username).subscribe(userEdit => {
      this.userService.updateProfile(userEdit.id, this.user).subscribe((data) => {
        updatedProfile(); 
        this.getUserInfo();
        this.authService.createActivityLog(ActionConstants.SESIÓN_EDITO_USUARIO, ' Modulo perfil');
      });
    });
  }


  getUserInfo() {
    this.userService.getUsername(this.userProfile).subscribe((formData) => {
      this.user = formData;
    }),
      (error) => {
        console.log(error);
      };
  }

  imageDownload: string;
  foto: string;
  downloadImage() {
    this.userService.getUsername(this.userProfile).subscribe((data) => {
      this.foto = data.profilePicture;
      this.userService.downloadImage(this.foto).subscribe((data) => {
        let downloadFile = window.URL.createObjectURL(data);
        FileSaver.saveAs(downloadFile, this.imageDownload);
      });
    });
  }


    //alerta para cambiar el password al primer ingrespo
    rebootSession = (title: string, text: string) => {
      Swal.fire({
        icon: 'info',
        title: title,
        text: text,
        confirmButtonColor: '#3f51b5',
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.sessionKilled();
        }
      });
    };







    
// onFileChanged(event) {
//   this.selectedFile = event.target.files[0];
// }


}
