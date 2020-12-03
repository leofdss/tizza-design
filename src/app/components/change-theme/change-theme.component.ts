import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ThemeService } from '../theme.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tz-change-theme',
  template: `
  <tz-switch [formControl]="form"><ng-content></ng-content></tz-switch>
  `,
  styles: []
})
export class ChangeThemeComponent implements OnInit, OnDestroy {

  constructor(private themeService: ThemeService) { }

  form: FormControl = new FormControl(false);

  theme: string | undefined;
  themes: string[] | undefined;
  sub = new Subscription();

  ngOnInit(): void {
    this.theme = this.themeService.getThemeName();
    this.themes = this.themeService.getThemesName();
    if (this.theme === 'Dark') {
      this.form.setValue(true);
    }
    this.sub.add(this.form.valueChanges.subscribe(value => {
      if (value) {
        this.themeService.setTheme('Dark');
      } else {
        this.themeService.setTheme('Light');
      }
    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
