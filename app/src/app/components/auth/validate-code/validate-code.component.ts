import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-validate-code',
  templateUrl: './validate-code.component.html',
  styleUrls: ['./validate-code.component.css']
})
export class ValidateCodeComponent implements OnInit {

  formCode: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { 
    this.formCode = this.formBuilder.group({
      username: ['', Validators.required],
      accesCode: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  sendCredentials(){
    return this.authService.sendCodeToResetPassword(this.formCode.value).subscribe(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.username);
      localStorage.setItem('role', res.role.name);
      this.router.navigate(['reset-password'])
    });
  }


}
