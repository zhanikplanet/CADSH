import { Component, Inject, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [ButtonModule, TranslateModule, CommonModule],
  providers: [TranslateService],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.scss',
})
export class JumbotronComponent implements AfterViewInit, OnDestroy {
  isMenuOpen = false;
  theme: 'light' | 'dark' = 'light';
  private observer!: MutationObserver;
  private themeSubscription!: Subscription;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') || 'en';
      this.translate.use(savedLang);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.detectTheme();
      this.observeThemeChanges();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  detectTheme() {
    if (typeof window !== 'undefined') {
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme = systemDarkMode ? 'dark' : 'light';
    }
  }

  observeThemeChanges() {
    const htmlElement = document.documentElement;

    this.observer = new MutationObserver(() => {
      this.detectTheme();
    });

    this.observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  changeLanguage(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
    this.translate.use(lang);
    this.isMenuOpen = false; 
  }

  closeMenuAfterScroll() {
    setTimeout(() => {
      this.isMenuOpen = false;
    }, 300);
  }

  scrollToContact() {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      this.closeMenuAfterScroll();
    }
  }

  scrollToAboutUs() {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('about-us-section')?.scrollIntoView({ behavior: 'smooth' });
      this.closeMenuAfterScroll();
    }
  }

  scrollToServices() {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
      this.closeMenuAfterScroll();
    }
  }

  scrollToProjects() {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
      this.closeMenuAfterScroll();
    }
  }
}
