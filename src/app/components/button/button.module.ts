import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [ButtonComponent]
})
export class ButtonModule { }
