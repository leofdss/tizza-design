import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormFieldComponent } from './form-field.component';
import { TzInput } from './input.component';

@NgModule({
  declarations: [FormFieldComponent, TzInput],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [FormFieldComponent, TzInput]
})
export class FormFieldModule { }
