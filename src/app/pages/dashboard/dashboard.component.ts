import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((user) => console.log(user));
  }

  onSignOut() {
    this.authService.logout();
  }

  openModal() {
    const modalRef = this.modalService.open(ModalDialogComponent);
    modalRef.result.then(
      (result) => {
        console.info(`Closed with: ${result}`);
      },
      (reason) => {
        console.info(`Dismissed with: ${reason}`);
      }
    );
  }
}
