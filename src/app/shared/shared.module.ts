import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { FieldErrorPrintComponent } from './field-error-print/field-error-print.component';

@NgModule({
  declarations: [
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    FieldErrorPrintComponent
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    FieldErrorPrintComponent,
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
