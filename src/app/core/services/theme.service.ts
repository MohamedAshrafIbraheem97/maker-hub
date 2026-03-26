import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme = signal<theme>('light');
  // BehaviorSubject to hold and manage the current theme

  constructor() {
    const savedTheme = (localStorage.getItem('theme') as theme) || 'light';
    this._theme.set(savedTheme); // Set initial value based on localStorage
  }

  /**
   * @description get the selected theme as a signal
   */
  get theme(): string {
    return this._theme();
  }

  /**
   * @description toggle the theme to the selected theme
   * @returns selected theme
   */
  public toggleTheme() {
    const newTheme = this._theme() === 'light' ? 'dark' : 'light';
    this._theme.set(newTheme); // Update the signal value
    localStorage.setItem('theme', newTheme); // Save the theme in localStorage
  }

  isDarkMode() {
    return this._theme() === 'dark';
  }
}
