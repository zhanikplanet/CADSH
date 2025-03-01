import {
  Component,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [ButtonModule, SkeletonModule, TranslateModule, CommonModule],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.scss',
})
export class JumbotronComponent implements OnInit, AfterViewInit, OnDestroy {
  isMenuOpen = false;
  theme: 'light' | 'dark' = 'light';

  heroTitle = '';
  heroSubtitle = '';
  heroDescription = '';
  contactButton = '';
  isLoading: boolean = true;

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

  ngOnInit() {
    this.loadTranslations();
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

  loadTranslations() {
    setTimeout(() => {
      this.translate.get([
        'HERO.TITLE',
        'HERO.SUBTITLE',
        'HERO.DESCRIPTION',
        'HERO.CONTACT_BUTTON'
      ]).subscribe(translations => {
        this.heroTitle = translations['HERO.TITLE'];
        this.heroSubtitle = translations['HERO.SUBTITLE'];
        this.heroDescription = translations['HERO.DESCRIPTION'];
        this.contactButton = translations['HERO.CONTACT_BUTTON'];
        this.isLoading = false;
      });
    }, 1000);
  }

  changeLanguage(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
    this.isLoading = true;
    this.translate.use(lang).subscribe(() => this.loadTranslations());
    this.isMenuOpen = false;
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

  closeMenuAfterScroll() {
    setTimeout(() => {
      this.isMenuOpen = false;
    }, 300);
  }

  scrollToSection(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      this.closeMenuAfterScroll();
    }
  }
}
