import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormFieldComponent } from './form-field.component';
import { TzInputDirective } from './input.directive';

@NgModule({
  declarations: [FormFieldComponent, TzInputDirective],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [FormFieldComponent, TzInputDirective]
})
export class FormFieldModule { }
