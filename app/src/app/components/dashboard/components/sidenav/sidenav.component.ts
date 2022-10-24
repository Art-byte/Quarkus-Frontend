import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import * as FileSaver from 'file-saver';
import { ActionConstants } from 'src/app/shared/utils/actionconstants';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  fillerContent = Array.from({ length: 50 }, () => ``);

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    public authService: AuthService,
    public userService: UserService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  logout() {
    this.authService.createActivityLogToExit(ActionConstants.FIN_DE_SESIÓN, ' Cerro la sesion');
    this.router.navigate(['/login']);
  }

  
  manualDownload: string = 'MANUAL_QUARKUS.pdf';
  downloadManual() {
    console.log('si esta entrando al metodo')
      this.userService.downloadUserManual(this.manualDownload).subscribe(data => {
        const blob = new Blob([data], {type: 'application/pdf'});
        const downloadFile = window.URL.createObjectURL(blob);
        FileSaver.saveAs(downloadFile, this.manualDownload);
    });
  }


}
