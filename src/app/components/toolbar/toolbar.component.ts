import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Theme, ThemeService } from '../theme.service';

@Component({
  selector: 'tz-toolbar',
  template: `
    <div 
      class="toolbar"
      id="header"
      [style.box-shadow]="shadow"
      [style.position]="position"
      [style.background-color]="theme?.value?.background"
      [style.color]="theme?.value?.title"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .toolbar {
      z-index: 1;
      height: 70px;
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      font-size: 20px;
      width: 100%;
      max-width: 100vw;
      transition:  border 0.5s, color 0.5s, background-color 0.5s;
      top: 0;
      font-family: 'Ubuntu', sans-serif;
    }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnDestroy {

  theme: Theme;
  sub = new Subscription();
  shadow = 'unset';
  position = 'static';

  constructor(private ref: ChangeDetectorRef, private themeService: ThemeService) {
    this.theme = this.themeService.getTheme();
    this.changeTheme();
    window.onscroll = () => { this.scrollFunction(); };
  }

  changeTheme() {
    this.sub.add(this.themeService.changeTheme().subscribe((theme: Theme) => {
      this.theme = theme;
      this.ref.detectChanges();
    }));
  }

  scrollFunction() {
    if (document.body.scrollTop > 7 || document.documentElement.scrollTop > 7) {
      this.shadow = '0 0 1em black';
      this.position = 'fixed';
    } else {
      this.shadow = 'unset';
      this.position = 'static';
    }
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
