import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Theme, ThemeService } from '../theme.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tz-form-field',
  template: `
    <div class="form-field">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements OnDestroy {

  theme: Theme;
  sub = new Subscription();

  constructor(private ref: ChangeDetectorRef, private themeService: ThemeService) {
    this.theme = this.themeService.getTheme();
    this.changeTheme();
  }

  changeTheme(): void {
    this.sub.add(this.themeService.changeTheme().subscribe((theme: Theme) => {
      this.theme = theme;
      this.ref.detectChanges();
    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
