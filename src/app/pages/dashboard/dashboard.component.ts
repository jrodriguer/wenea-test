import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSignOut() {
    this.authService.logout();
  }

  openModal() {
    const modalRef = this.modalService.open(ModalDialogComponent);
    modalRef.result.then(
      (result) => {
        this.authService.updateCredentials(result.email, result.password).then(
          (user) => {
            console.log(user);
            // this.userService
            //   .updateUser()
            //   .pipe(takeUntil(this.destroyed$))
            //   .subscribe((user: any) => {
            //     console.log(user);
            //   });
            this.router.navigate(['dashboard']);
          },
          (err) => console.error(err)
        );
        this.authService.logout();
      },
      (reason) => {
        console.info(`Dismissed with: ${reason}`);
      }
    );
  }
}
