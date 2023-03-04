import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { User } from '../../../models/user.model';
import { Address, UserDoc } from '../../../models/ddbb.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public userLogued$: any; // TODO: confused type
  private destroyed$ = new Subject<void>();
  public address: Address | undefined;
  public name: string = '';
  public users: any[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    // consume for Subject
    this.userLogued$ = this.authService.user$.pipe(filter((acc) => !!acc));
    this.userLogued$.pipe(takeUntil(this.destroyed$)).subscribe((v: User) => {
      this.address = v.address;
      this.name = v.name;
    });

    this._loadGeneralData();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private _loadGeneralData() {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((doc: UserDoc[]) => {
        let order = 0;
        this.users = doc.map((user: UserDoc) => {
          ++order;
          return {
            ...user,
            order,
            addressRe: `${user.address.street}, ${user.address.city}`
          };
        });
      });
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
