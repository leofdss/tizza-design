import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Theme, ThemeService } from '../theme.service';

@Component({
  selector: 'tz-radio',
  template: `
  <div class="container" [style.color]="theme?.value?.title" (click)="onValue()">
    <input type="radio" [value]="value" [name]="name"
      [(ngModel)]="input"
      [style.--active]="currentColorHex"
      [style.--border]="theme?.value?.border"
      [style.--border-hover]="currentColorHex"
      [style.--focus]="currentColorHex"
      [style.--background]="theme?.value?.background"
      [style.--background-hover]="theme?.value?.focus"
      [style.--disabled-inner]="currentColorHex"
      [style.--disabled]="theme?.value?.background"
      [disabled]="disabled ? 'true' : 'false'"
    #radio>
    <label (click)="radio.click()">
      <ng-content></ng-content>
    </label>
  </div>
  `,
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent implements OnInit, OnDestroy {

  sub = new Subscription();
  theme: Theme | undefined;
  disabled: boolean | undefined;
  @Input() value: boolean | string | number | undefined;
  name = '';

  emitter: EventEmitter<boolean | string | number> | undefined;

  input: boolean | string | number | undefined;

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
    this.setTheme();
    this.changeTheme();
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
      this.ref.detectChanges();
    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onValue() {
    this.emitter?.emit(this.value);
  }
}
