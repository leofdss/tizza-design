import { CommonModule } from '@angular/common';
import { ElementRef, Self } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonDirective } from './button.directive';

describe('ButtonDirective', () => {
  let directive: ButtonDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ElementRef, deps: [] },
        { provide: ButtonDirective, deps: [[new Self(), ElementRef]] }
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();
    directive = TestBed.inject(ButtonDirective);
  });

  it('should be created', () => {
    expect(directive).toBeTruthy();
  });
});
