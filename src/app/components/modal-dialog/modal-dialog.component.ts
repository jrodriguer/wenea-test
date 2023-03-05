import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDoc } from 'src/models/ddbb.model';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {
  @Input() user: UserDoc = {} as UserDoc;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
