import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { User } from 'src/models/user.model';
import { Observable } from '@firebase/util';
import { Address } from 'src/models/ddbb.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public userLogued$: any;
  private destroyed$ = new Subject<void>();
  public address: Address | undefined;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.userLogued$ = this.authService.user$.pipe(filter((acc) => !!acc));
    this.userLogued$.pipe(takeUntil(this.destroyed$)).subscribe((v: User) => {
      this.address = v.address;
    });
  }

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
          () => {
            this.router.navigate(['login']);
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
