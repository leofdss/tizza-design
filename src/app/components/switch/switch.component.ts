import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Theme, ThemeService } from '../theme.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tz-switch',
  template: `
  <div class="container" [style.color]="theme?.value?.title">
    <input type="checkbox" class="switch"
      [(ngModel)]="input"
      (ngModelChange)="onChange($event)"
      (blur)="onTouch()"
      [style.--active]="currentColorHex"
      [style.--border]="theme?.value?.border"
      [style.--focus]="currentColorHex"
      [style.--border-hover]="currentColorHex"
      [style.--background]="theme?.value?.background"
      [style.--background-hover]="theme?.value?.focus"
      [style.--disabled-inner]="currentColorHex"
      [style.--disabled]="theme?.value?.background"
      [disabled]="disabled ? 'true' : 'false'"
    #switch>
    <label (click)="switch.click()">
      <ng-content></ng-content>
    </label>
  </div>
  `,
  styleUrls: ['./switch.component.scss', './container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SwitchComponent)
    }
  ]
})
export class SwitchComponent implements OnInit, OnDestroy {

  input: boolean | undefined;
  theme: Theme | undefined;
  disabled: boolean | undefined;
  sub = new Subscription();
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

  ngOnInit(): void {
    this.setTheme();
    this.changeTheme();
  }

  setTheme(): void {
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

  changeTheme(): void {
    this.sub.add(this.themeService.changeTheme().subscribe((theme: Theme) => {
      this.theme = theme;
      this.ref.detectChanges();
    }));
  }

  ngOnDestroy(): void {
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
  writeValue(input: boolean): void {
    this.input = input;
    this.ref.detectChanges();
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.ref.detectChanges();
  }
}
