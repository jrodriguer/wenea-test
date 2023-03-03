import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {}

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
