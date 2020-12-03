import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, Self } from '@angular/core';
import { Subscription } from 'rxjs';

import { Theme, ThemeService } from '../theme.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[tzInput]'
})
export class TzInputDirective implements OnInit, AfterViewInit, OnDestroy {
  constructor(@Self() private el: ElementRef, private themeService: ThemeService, private renderer: Renderer2) {
    this.setDefault();
    this.setTheme();
  }

  @Input() autocomplete: string | undefined;
  @Input() width: string | undefined;
  @Input() height: string | undefined;
  theme: Theme | undefined;
  sub = new Subscription();

  ngOnInit(): void {
    this.setAutocomplete();
    this.setSize();
    this.changeTheme();
  }

  ngAfterViewInit(): void {
    if (this.el.nativeElement.disabled) {
      this.el.nativeElement.style.cursor = 'not-allowed';
      this.el.nativeElement.style.opacity = '0.4';
    }
  }

  setSize(): void {
    const nativeElement = this.el.nativeElement as HTMLElement;
    const div = nativeElement.parentNode;
    const formField = div?.parentNode;

    if (this.width && this.height) {
      this.el.nativeElement.style.width = this.width;
      this.el.nativeElement.style.height = this.height;
      this.renderer.setAttribute(formField, 'style', `
      min-width: ${this.width};
      min-height: ${this.height};
      `);
    } else if (this.width) {
      this.el.nativeElement.style.height = '45px';
      this.el.nativeElement.style.width = this.width;
      this.renderer.setAttribute(formField, 'style', `min-width: ${this.width};`);
    } else if (this.height) {
      this.el.nativeElement.style.width = '200px';
      this.el.nativeElement.style.height = this.height;
      this.renderer.setAttribute(formField, 'style', `min-height: ${this.height};`);
    } else {
      this.el.nativeElement.style.width = '200px';
      this.el.nativeElement.style.height = '45px';
    }
  }

  setAutocomplete(): void {
    if (!this.autocomplete) {
      this.renderer.setAttribute(this.el.nativeElement, 'autocomplete', 'off');
    }
  }

  setDefault(): void {
    this.el.nativeElement.style.fontFamily = '\'Ubuntu\', sans-serif';
    this.el.nativeElement.style.fontSize = '15px';
    this.el.nativeElement.style.padding = '12px 20px';
    this.el.nativeElement.style.margin = '8px 0';
    this.el.nativeElement.style.display = 'inline-block';
    this.el.nativeElement.style.borderRadius = '4px';
    this.el.nativeElement.style.boxSizing = 'border-box';
    this.el.nativeElement.style.transition = 'border 0.5s, color 0.5s, background-color 0.5s';
    this.el.nativeElement.style.outline = 'none';
    this.el.nativeElement.style.webkitAppearance = 'none';
  }

  setTheme(): void {
    this.theme = this.themeService.getTheme();
    this.el.nativeElement.style.backgroundColor = this.theme.value.background;
    this.el.nativeElement.style.color = this.theme.value.title;
    this.el.nativeElement.style.border = `2px solid ${this.theme.value.background}`;
  }

  /** Selected  */
  @HostListener('focus') onFocus(): void {
    this.el.nativeElement.style.backgroundColor = this.theme?.value.focus;
    this.el.nativeElement.style.border = `2px solid ${this.theme?.value.primary}`;
  }
  @HostListener('blur') onBlur(): void {
    this.el.nativeElement.style.backgroundColor = this.theme?.value.background;
    this.el.nativeElement.style.border = `2px solid ${this.theme?.value.background}`;
  }

  /** Mouse */
  @HostListener('mouseenter') onMouseEnter(): void {
    this.el.nativeElement.style.backgroundColor = this.theme?.value.focus;
  }
  @HostListener('mouseleave') onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = this.theme?.value.background;
  }

  changeTheme(): void {
    this.sub.add(this.themeService.changeTheme().subscribe((theme: Theme) => {
      this.theme = theme;
      this.el.nativeElement.style.backgroundColor = this.theme.value.background;
      this.el.nativeElement.style.color = this.theme.value.title;
      this.el.nativeElement.style.border = `2px solid ${this.theme.value.background}`;
    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
