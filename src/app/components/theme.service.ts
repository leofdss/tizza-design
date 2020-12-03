import { EventEmitter, Injectable } from '@angular/core';

interface ThemeValue {
  primary: string;
  success: string;
  info: string;
  warning: string;
  danger: string;
  invertPrimary: string;
  invertSuccess: string;
  invertInfo: string;
  invertWarning: string;
  invertDanger: string;

  background: string;
  focus: string;
  card: string;
  icon: string;
  title: string;
  invertTitle: string;
  subtitle: string;
  border: string;
}

export interface Theme {
  name: string;
  value: ThemeValue;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeName: string | undefined;
  private themes = new Map<string, ThemeValue>();
  private themeChange: EventEmitter<Theme> = new EventEmitter<Theme>();
  private themesName = [
    'Light',
    'Dark'
  ];

  constructor() {

    this.themes.set('Dark', {
      primary: '#0097e6',
      success: '#00e892',
      info: '#3d7dff',
      warning: '#ffaf00',
      danger: '#ff006c',
      invertPrimary: '#ffffff',
      invertSuccess: '#ffffff',
      invertInfo: '#ffffff',
      invertWarning: '#ffffff',
      invertDanger: '#ffffff',

      background: '#1e2126',
      focus: '#1e2126',
      card: '#272b2e',
      icon: '#515558',
      subtitle: '#a3a7b2',
      title: '#ffffff',
      invertTitle: '#ffffff',
      border: '#787878'
    });

    this.themes.set('Light', {
      primary: '#0097e6',
      success: '#00e892',
      info: '#3d7dff',
      warning: '#ffaf00',
      danger: '#ff006c',
      invertPrimary: '#ffffff',
      invertSuccess: '#ffffff',
      invertInfo: '#ffffff',
      invertWarning: '#ffffff',
      invertDanger: '#ffffff',

      background: '#edf0f7',
      focus: '#edf0f7',
      card: '#ffffff',
      icon: '#3b3b3b',
      subtitle: '#a3a7b2',
      title: '#000000',
      invertTitle: '#ffffff',
      border: '#999999'
    });

    const theme = localStorage.getItem('theme');

    this.setTheme(theme ? theme : '');
    this.setBackground();
  }

  setBackground(): void {
    document.body.style.backgroundColor = this.getTheme().value.background;
    setTimeout(() => {
      document.body.style.transition = '0.5s';
    }, 10);
  }

  setTheme(themeName: string): string {
    if (themeName) {
      this.themeName = themeName;
    } else {
      this.themeName = this.themesName[0];
    }
    localStorage.setItem('theme', this.themeName);
    const theme = this.themes.get(this.themeName);
    if (theme) {
      this.themeChange.emit({
        name: themeName,
        value: theme
      });
    }
    return themeName;
  }

  changeTheme(): EventEmitter<Theme> {
    return this.themeChange;
  }

  getTheme(): Theme {
    return {
      name: this.themeName,
      value: this.themeName ? this.themes.get(this.themeName) : null
    } as Theme;
  }

  getThemesName(): string[] {
    return this.themesName;
  }

  getThemeName(): string {
    if (this.themeName) {
      return this.themeName;
    }
    return this.setTheme('');
  }
}
