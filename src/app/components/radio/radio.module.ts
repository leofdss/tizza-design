import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RadioGroupComponent } from './radio-group.component';
import { RadioComponent } from './radio.component';

@NgModule({
  declarations: [RadioComponent, RadioGroupComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [RadioComponent, RadioGroupComponent]
})
export class RadioModule { }
