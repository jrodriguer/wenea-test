import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalDialogComponent } from './modal-dialog.component';

@NgModule({
  declarations: [ModalDialogComponent],
  imports: [CommonModule, NgbModule, FormsModule, ReactiveFormsModule]
})
export class ModalDialogModule {}
