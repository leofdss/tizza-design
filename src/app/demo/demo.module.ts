import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '../components/button/button.module';
import { CardModule } from '../components/card/card.module';
import { ChangeThemeModule } from '../components/change-theme/change-theme.module';
import { CheckboxModule } from '../components/checkbox/checkbox.module';
import { FormFieldModule } from '../components/form-field/form-field.module';
import { LayoutModule } from '../components/layout/layout.module';
import { RadioModule } from '../components/radio/radio.module';
import { SwitchModule } from '../components/switch/switch.module';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CardModule,
    ChangeThemeModule,
    ToolbarModule,
    FormFieldModule,
    CheckboxModule,
    SwitchModule,
    RadioModule,
    ButtonModule,
    LayoutModule
  ],
  exports: [DemoComponent]
})
export class DemoModule { }
