import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Theme, ThemeService } from '../theme.service';

@Component({
  selector: 'tz-card',
  template: `
    <div 
      class="card"
      [style.background-color]="theme?.value?.card"
      [style.color]="theme?.value?.title"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      border-radius: 10px;
      width: 100%;
      padding: 10px;
      transition: 0.5s;
      font-family: 'Ubuntu', sans-serif;
    }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnDestroy {

  theme: Theme;
  sub = new Subscription();

  constructor(private ref: ChangeDetectorRef, private themeService: ThemeService) {
    this.theme = this.themeService.getTheme();
    this.changeTheme();
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
}
