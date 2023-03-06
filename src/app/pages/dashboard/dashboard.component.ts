import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { User } from '../../../models/user.model';
import { Address, UserDoc } from '../../../models/ddbb.model';
import { UserService } from '../../services/user.service';
import { GeocodingService } from '../../services/geocoding.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public userLogued$!: Observable<User | null>;
  private destroyed$ = new Subject<void>();
  public name: string = '';
  public city: string = '';
  public coordinates: { latitude: number; longitude: number } | undefined;
  public users: any[] = [];
  public showAllUsers = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private geocodingService: GeocodingService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // consume for Subject
    this.userLogued$ = this.authService.user$.pipe(
      filter((user) => !!user),
      takeUntil(this.destroyed$)
    );

    this.userLogued$.subscribe((user) => {
      if (user && user.address) {
        this.name = user.name;
        this.city = user.address.city;
        this._toGeographicalCoordinates(user?.address);
      }
    });

    this._loadUsersData();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private _loadUsersData() {
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

  toggleShowAllUsers() {
    this.showAllUsers = !this.showAllUsers;
  }

  getUsersToShow() {
    if (this.showAllUsers) {
      return this.users;
    } else {
      return this.users.slice(0, 7);
    }
  }

  private _toGeographicalCoordinates(address: Address | undefined) {
    this.geocodingService
      .geocode(`${address?.street} ${address?.city} ${address?.zip}`)
      .subscribe((coords) => (this.coordinates = coords));
  }

  onSignOut() {
    this.authService.logout();
  }

  onSettingsUser() {
    const modalRef = this.modalService.open(ModalDialogComponent, {
      centered: true,
      backdrop: 'static'
    });
    (modalRef.componentInstance as ModalDialogComponent).udpateCredentials =
      true;

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

  onInfoUser(selected: UserDoc) {
    const modalRef = this.modalService.open(ModalDialogComponent, {
      centered: true,
      backdrop: 'static'
    });
    (modalRef.componentInstance as ModalDialogComponent).user = selected;
  }
}
