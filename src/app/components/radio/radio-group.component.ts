/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, forwardRef, Input, OnDestroy, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { RadioComponent } from './radio.component';

@Component({
  selector: 'tz-radio-group',
  template: `
    <div>
      <ng-content></ng-content>
    <div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RadioGroupComponent)
    }
  ]
})
export class RadioGroupComponent implements AfterContentInit, OnDestroy {

  constructor(private ref: ChangeDetectorRef) { }

  @ContentChildren(RadioComponent) radios: QueryList<RadioComponent> | undefined;
  @Input() name: string | undefined;
  disabled: boolean | undefined;
  emitter = new EventEmitter<boolean | string | number>();
  sub = new Subscription();

  ngAfterContentInit() {
    this.radios?.forEach((radio: RadioComponent) => {
      radio.emitter = this.emitter;
      radio.name = this.name ? this.name : '';
      radio.input = this.input;
      radio.disabled = !!this.disabled;
    });

    this.sub.add(this.emitter.subscribe((value: boolean | string | number) => {
      this.input = value;
      this.onTouch();
      this.onChange(this.input);
      this.radios?.forEach((radio: RadioComponent) => {
        radio.input = this.input;
      });
    }));
  }

  ngOnDestroy() {
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
  input: any;
  writeValue(input: any) {
    this.input = input;
    this.ref.detectChanges();
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.ref.detectChanges();
  }
}
