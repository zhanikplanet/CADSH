import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule, DialogModule, ButtonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  visible: boolean = false;
  selectedItem: any = null;
  items: any[] = [];
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

  loadTranslations() {
    this.translate.get('Projects').subscribe((projectData: any) => {
      if (projectData && projectData.ITEM_1) {
        this.items = [
          {
            imgSrc: '/assets/img/harnessing.jpg',
            alt: '1',
            title: projectData.ITEM_1.TITLE,
            text: projectData.ITEM_1.TEXT
          },
          {
            imgSrc: '/assets/img/R&D.jpg',
            alt: '2',
            title: projectData.ITEM_2.TITLE,
            text: projectData.ITEM_2.TEXT
          },
          {
            imgSrc: '/assets/img/fintech.jpg',
            alt: '3',
            title: projectData.ITEM_3.TITLE,
            text: projectData.ITEM_3.TEXT
          },
          {
            imgSrc: '/assets/img/security.avif',
            alt: '4',
            title: projectData.ITEM_4.TITLE,
            text: projectData.ITEM_4.TEXT
          },
          {
            imgSrc: '/assets/img/futuristic.webp',
            alt: '5',
            title: projectData.ITEM_5.TITLE,
            text: projectData.ITEM_5.TEXT
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
