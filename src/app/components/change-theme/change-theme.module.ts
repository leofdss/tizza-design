import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SwitchModule } from '../switch/switch.module';
import { ChangeThemeComponent } from './change-theme.component';

@NgModule({
  declarations: [ChangeThemeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SwitchModule
  ],
  exports: [ChangeThemeComponent]
})
export class ChangeThemeModule { }
