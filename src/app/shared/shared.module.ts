import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [AlertComponent, DropdownDirective],
  imports: [CommonModule],
  exports: [AlertComponent, DropdownDirective, CommonModule],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
