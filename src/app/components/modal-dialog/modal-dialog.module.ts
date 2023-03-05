import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalDialogComponent } from './modal-dialog.component';

@NgModule({
  declarations: [ModalDialogComponent],
  imports: [CommonModule, NgbModule]
})
export class ModalDialogModule {}
