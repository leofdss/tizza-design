import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Theme, ThemeService } from '../theme.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tz-toolbar',
  template: `
    <div
      class="toolbar"
      id="header"
      [@float]="isFloating ? 'floating' : 'ground'"
      [style.background-color]="theme?.value?.background"
      [style.color]="theme?.value?.title"
    >
      <ng-content></ng-content>
    </div>
    <div class="support"><div>
  `,
  styles: [`
    .support {
      z-index: 1;
      height: 70px;
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      font-size: 20px;
      width: 100%;
      max-width: 100vw;
      top: 0;
    }
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
      top: 0;
      transition: border 0.5s, color 0.5s, background-color 0.5s;
      font-family: 'Ubuntu', sans-serif;
      position: fixed;
    }
  `
  ],
  animations: [
    trigger('float', [
      state('floating', style({
        boxShadow: '0 0 1em rgba(0, 0, 0, 0.5)',
      })),
      state('ground', style({
        boxShadow: 'unset',
      })),
      transition('floating => ground', [
        animate('0.5s')
      ]),
      transition('ground => floating', [
        animate('0.5s')
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnDestroy {

  isFloating = false;

  theme: Theme;
  sub = new Subscription();

  constructor(private ref: ChangeDetectorRef, private themeService: ThemeService) {
    this.theme = this.themeService.getTheme();
    this.changeTheme();
    window.onscroll = () => { this.scrollFunction(); };
  }

  changeTheme(): void {
    this.sub.add(this.themeService.changeTheme().subscribe((theme: Theme) => {
      this.theme = theme;
      this.ref.detectChanges();
    }));
  }

  scrollFunction(): void {
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
      this.isFloating = true;
    } else {
      this.isFloating = false;
    }
    this.ref.detectChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
