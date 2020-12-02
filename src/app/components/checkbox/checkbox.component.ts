/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Theme, ThemeService } from '../theme.service';

@Component({
  selector: 'tz-checkbox',
  template: `
  <div class="container" [style.color]="theme?.value?.title">
    <input type="checkbox"
      [indeterminate]="indeterminate"
      [(ngModel)]="input"
      (ngModelChange)="onChange($event)"
      (blur)="onTouch()"
      [style.--active]="currentColorHex"
      [style.--border]="theme?.value?.border"
      [style.--border-hover]="currentColorHex"
      [style.--focus]="currentColorHex"
      [style.--background]="theme?.value?.background"
      [style.--background-hover]="'red'"
      [style.--disabled-inner]="currentColorHex"
      [style.--disabled]="theme?.value?.background"
      [disabled]="disabled ? 'true' : 'false'"
    #checkbox>
    <label (click)="checkbox.click()">
      <ng-content></ng-content>
    </label>
  </div>
  `,
  styleUrls: ['./checkbox.component.scss', './container.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CheckboxComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit, OnDestroy, OnChanges {

  theme: Theme | undefined;
  sub = new Subscription();
  disabled: boolean | undefined;
  @Input() indeterminate: boolean | undefined;
  input: boolean | undefined;
  @Input() color: string | undefined;
  currentColor = 'primary';
  colors = [
    'primary',
    'success',
    'info',
    'warning',
    'danger'
  ];
  currentColorHex: string | undefined;

  constructor(private ref: ChangeDetectorRef, private themeService: ThemeService) { }

  ngOnInit() {
    this.changeTheme();
    this.setTheme();
  }

  setTheme() {
    this.theme = this.themeService.getTheme();
    if (this.color && this.colors.indexOf(this.color) !== -1) {
      this.currentColor = this.color;
    }
    switch (this.currentColor) {
      case 'primary': {
        this.currentColorHex = this.theme.value?.primary;
        break;
      }
      case 'success': {
        this.currentColorHex = this.theme.value?.success;
        break;
      }
      case 'info': {
        this.currentColorHex = this.theme.value?.info;
        break;
      }
      case 'warning': {
        this.currentColorHex = this.theme.value?.warning;
        break;
      }
      case 'danger': {
        this.currentColorHex = this.theme.value?.danger;
        break;
      }
    }
  }

  changeTheme() {
    this.sub.add(this.themeService.changeTheme().subscribe((theme: Theme) => {
      this.theme = theme;
      this.setTheme();
      this.ref.detectChanges();
    }));
  }

  ngOnChanges() {
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    this.ref.detectChanges();
    this.sub.unsubscribe();
  }

  /** NG Model */
  onChange: any = () => {
    this.ref.detectChanges();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.ref.detectChanges();
  }
  onTouch: any = () => {
    this.ref.detectChanges();
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
    this.ref.detectChanges();
  }
  writeValue(input: boolean) {
    this.input = !!input;
    this.ref.detectChanges();
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.ref.detectChanges();
  }
}
