import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslateModule, DialogModule, ButtonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  activeTab = 1;
  theme: 'light' | 'dark' = 'light';
  private observer!: MutationObserver;
  private langChangeSub!: Subscription;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.loadTranslations();

    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
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
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  detectTheme() {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (!storedTheme) {
        const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.theme = systemDarkMode ? 'dark' : 'light';
      } else {
        this.theme = storedTheme === 'dark' ? 'dark' : 'light';
      }
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

  selectTab(tabIndex: number) {
    this.activeTab = tabIndex;
  }

  visible: boolean = false;
  selectedItem: any = null;
  tabs: any[] = [];

  loadTranslations() {
    this.translate.get('SERVICES').subscribe((serviceData: any) => {
      if (serviceData && serviceData.ITEM_1) {
        this.tabs = [
          {
            imgSrc: '/assets/img/software-development.png',
            alt: 'Software Development',
            title: serviceData.ITEM_1.TITLE,
            text: serviceData.ITEM_1.TEXT
          },
          {
            imgSrc: '/assets/img/saas-platforms.png',
            alt: 'SaaS Platforms',
            title: serviceData.ITEM_2.TITLE,
            text: serviceData.ITEM_2.TEXT
          },
          {
            imgSrc: '/assets/img/consulting-services.png',
            alt: 'Consulting Services',
            title: serviceData.ITEM_3.TITLE,
            text: serviceData.ITEM_3.TEXT
          },
          {
            imgSrc: '/assets/img/training-programms.png',
            alt: 'Training Programs',
            title: serviceData.ITEM_4.TITLE,
            text: serviceData.ITEM_4.TEXT
          },
          {
            imgSrc: '/assets/img/procurement&logistics.png',
            alt: 'Procurement & Logistics',
            title: serviceData.ITEM_5.TITLE,
            text: serviceData.ITEM_5.TEXT
          }
        ];
      }
    });
  }

  showDialog(item: any) {
    this.selectedItem = item;
    this.visible = true;
  }
}
