import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { faGlobe, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {
  protected readonly title = signal('maker-hub');
  langIcon = faGlobe;
  themeService = inject(ThemeService);

  translocoService = inject(TranslocoService);
  themeIcon = computed(() => (this.themeService.isDarkMode() ? faSun : faMoon));

  ngOnInit() {
    this.initLanguage();
  }

  toggleLanguage() {
    const newLang = this.translocoService.getActiveLang() === 'en' ? 'ar' : 'en';
    this.translocoService.setActiveLang(newLang);
    localStorage.setItem('lang', newLang);
    this.updateDirection(newLang);
  }

  initLanguage() {
    const lang = localStorage.getItem('lang') || this.translocoService.getDefaultLang();
    this.translocoService.setActiveLang(lang);
    this.updateDirection(lang);
  }

  private updateDirection(lang: string) {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
