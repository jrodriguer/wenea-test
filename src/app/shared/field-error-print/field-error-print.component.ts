import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'app-field-error-print',
  templateUrl: './field-error-print.component.html',
  styleUrls: ['./field-error-print.component.scss']
})
export class FieldErrorPrintComponent {
  @Input('control')
  control: any;
}
