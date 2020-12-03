import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonDirective } from './button.directive';

@NgModule({
  declarations: [ButtonDirective],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [ButtonDirective]
})
export class ButtonModule { }
