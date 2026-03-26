import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme = signal<Theme>('light');

  constructor() {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    this._theme.set(savedTheme);
    this.applyTheme(savedTheme);
  }

  get theme(): Theme {
    return this._theme();
  }

  isDarkMode(): boolean {
    return this._theme() === 'dark';
  }

  toggleTheme(): void {
    const newTheme: Theme = this._theme() === 'light' ? 'dark' : 'light';
    this._theme.set(newTheme);
    localStorage.setItem('theme', newTheme);
    this.applyTheme(newTheme);
  }

  private applyTheme(theme: Theme): void {
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }
}
