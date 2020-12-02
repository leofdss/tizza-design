import { animate, AnimationBuilder, AnimationPlayer, keyframes, style } from '@angular/animations';
import { AfterViewInit, ElementRef, HostListener, Input, OnDestroy, Self } from '@angular/core';
import { Directive, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Theme, ThemeService } from '../theme.service';

@Directive({
  selector: '[tzButton]'
})
export class ButtonComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(@Self() private el: ElementRef, private themeService: ThemeService, private builder: AnimationBuilder) { }

  theme: Theme | undefined;
  sub = new Subscription();
  player: AnimationPlayer | undefined;
  @Input() type: string | undefined;

  @Input() border: string | undefined;
  currentBorder = 'flat';
  borders = [
    'flat',
    'stroked',
    'basic',
    'raised'
  ];

  @Input() shape: string | undefined;
  currentShape = 'retangle';
  shapes = [
    'retangle',
    'round'
  ];

  @Input() color: string | undefined;
  currentColor = 'default';
  colors = [
    'primary',
    'success',
    'info',
    'warning',
    'danger'
  ];

  ngOnInit(): void {
    this.initTheme();
    this.changeTheme();
  }

  ngAfterViewInit() {
    if (this.el.nativeElement.disabled) {
      this.el.nativeElement.style.cursor = 'not-allowed';
      this.el.nativeElement.style.opacity = '0.4';
    }
    this.buildAnimation();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setDefault() {
    this.el.nativeElement.style.outline = 'none';
    this.el.nativeElement.style.minWidth = 'max-content';
    this.el.nativeElement.style.width = '30px';
    this.el.nativeElement.style.fontFamily = '\'Ubuntu\', sans-serif';
    this.el.nativeElement.style.padding = '1em';
    this.el.nativeElement.style.boxSizing = 'border-box';
    this.el.nativeElement.style.textAlign = 'center';
    this.el.nativeElement.style.textDecoration = 'none';
    this.el.nativeElement.style.display = 'block';
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.fontSize = '10px';
    this.el.nativeElement.style.transition = 'border 0.5s, color 0.5s, background-color 0.5s';
  }

  setChape() {
    switch (this.currentShape) {
      case 'retangle': {
        this.el.nativeElement.style.borderRadius = '4px';
        break;
      }
      case 'round': {
        this.el.nativeElement.style.borderRadius = '17px';
        break;
      }
    }
  }

  setBorder() {
    switch (this.currentBorder) {
      case 'flat': {
        break;
      }
      case 'stroked': {
        if (this.currentColor !== 'default') {
          this.el.nativeElement.style.color = this.el.nativeElement.style.backgroundColor;
          this.el.nativeElement.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        } else {
          this.el.nativeElement.style.color = this.theme?.value.title;
          this.el.nativeElement.style.backgroundColor = 'rgba(0, 0, 0, 0)';
          this.el.nativeElement.style.borderColor = this.theme?.value.title;
        }
        break;
      }
      case 'basic': {
        if (this.currentColor !== 'default') {
          this.el.nativeElement.style.color = this.el.nativeElement.style.backgroundColor;
        }
        this.el.nativeElement.style.border = 'rgba(0, 0, 0, 0)';
        this.el.nativeElement.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        break;
      }
      case 'raised': {
        this.el.nativeElement.style.boxShadow = '0px 1px 2px #000';
        this.el.nativeElement.style.webkitBoxShadow = '0px 1px 2px #000';
        this.el.nativeElement.style.mozBoxShadow = '0px 1px 2px #000';
        break;
      }
    }
  }

  setColor() {
    switch (this.currentColor) {
      case 'primary': {
        this.el.nativeElement.style.backgroundColor = this.theme?.value.primary;
        this.el.nativeElement.style.border = `2px solid ${this.theme?.value.primary}`;
        this.el.nativeElement.style.color = this.theme?.value.invertPrimary;
        break;
      }
      case 'success': {
        this.el.nativeElement.style.backgroundColor = this.theme?.value.success;
        this.el.nativeElement.style.border = `2px solid ${this.theme?.value.success}`;
        this.el.nativeElement.style.color = this.theme?.value.invertSuccess;
        break;
      }
      case 'info': {
        this.el.nativeElement.style.backgroundColor = this.theme?.value.info;
        this.el.nativeElement.style.border = `2px solid ${this.theme?.value.info}`;
        this.el.nativeElement.style.color = this.theme?.value.invertInfo;
        break;
      }
      case 'warning': {
        this.el.nativeElement.style.backgroundColor = this.theme?.value.warning;
        this.el.nativeElement.style.border = `2px solid ${this.theme?.value.warning}`;
        this.el.nativeElement.style.color = this.theme?.value.invertWarning;
        break;
      }
      case 'danger': {
        this.el.nativeElement.style.backgroundColor = this.theme?.value.danger;
        this.el.nativeElement.style.border = `2px solid ${this.theme?.value.danger}`;
        this.el.nativeElement.style.color = this.theme?.value.invertDanger;
        break;
      }
      default: {
        this.el.nativeElement.style.backgroundColor = this.theme?.value.background;
        this.el.nativeElement.style.border = `2px solid ${this.theme?.value.background}`;
        this.el.nativeElement.style.color = this.theme?.value.title;
        break;
      }
    }
  }

  initTheme() {
    this.setDefault();
    if (this.border && this.borders.indexOf(this.border) !== -1) {
      this.currentBorder = this.border;
    }
    if (this.shape && this.shapes.indexOf(this.shape) !== -1) {
      this.currentShape = this.shape;
    }
    if (this.color && this.colors.indexOf(this.color) !== -1) {
      this.currentColor = this.color;
    } else {
      if (this.type === 'submit') {
        this.currentColor = 'success';
      }
    }
    this.setTheme();
  }

  setTheme() {
    this.theme = this.themeService.getTheme();
    this.setColor();
    this.setBorder();
    this.setChape();
  }

  changeTheme() {
    this.sub.add(this.themeService.changeTheme().subscribe(() => {
      this.setTheme();
    }));
  }

  buildAnimation() {
    const animationFactory = this.el.nativeElement.style.backgroundColor !== 'rgba(0, 0, 0, 0)' ?
      this.builder.build([
        animate(800, keyframes([
          style({ opacity: 0.2, offset: 0 }),
          style({ opacity: 0.4, offset: 0.2 }),
          style({ opacity: 1, offset: 1 })
        ]))
      ]) : this.builder.build([
        animate(500, keyframes([
          style({ backgroundColor: this.el.nativeElement.style.color, offset: 0 }),
          style({ backgroundColor: this.el.nativeElement.style.backgroundColor, offset: 1 })
        ]))
      ]);
    this.player = animationFactory.create(this.el.nativeElement);
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.player?.play();
  }
}
