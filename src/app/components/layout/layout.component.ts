import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { Theme, ThemeService } from '../theme.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tz-layout',
  template: `
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <div
      class="layout"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .layout {
      width: 100%;
      max-width: 100vw;
      height: 100%;
      font-family: 'Ubuntu', sans-serif;
      transition: 0.5s;
    }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnDestroy {

  theme: Theme;
  sub = new Subscription();

  constructor(private ref: ChangeDetectorRef, private themeService: ThemeService, private renderer: Renderer2) {
    this.theme = this.themeService.getTheme();
    this.changeTheme();
  }

  changeTheme(): void {
    this.sub.add(this.themeService.changeTheme().subscribe((theme: Theme) => {
      this.theme = theme;
      this.renderer.setAttribute(document.body, 'style', `
      background-color: ${theme.value.background};
      font-family: \'Ubuntu\', sans-serif;
      `);
      this.ref.detectChanges();
    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
