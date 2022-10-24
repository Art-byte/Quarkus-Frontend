import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {
  userActivity;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setTimeOut();
  }

    //Validamos el tiempo de inactividad del usuario
    setTimeOut() {
      this.userActivity = setTimeout(() => {
        this.router.navigate(['login']);
      }, 15000); //15 segundos
    }

}
