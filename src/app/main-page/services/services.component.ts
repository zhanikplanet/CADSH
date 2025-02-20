import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslateModule, DialogModule, ButtonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  visible: boolean = false;
  selectedItem: any = null;
  items: any[] = [];

  constructor(private translate: TranslateService) {
    this.loadTranslations();
    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }

  loadTranslations() {
    this.translate.get('SERVICES').subscribe((serviceData: any) => {
      if (serviceData && serviceData.ITEM_1) {
        this.items = [
          {
            imgSrc: '/assets/img/harnessing.jpg',
            alt: '1',
            title: serviceData.ITEM_1.TITLE,
            text: serviceData.ITEM_1.TEXT
          },
          {
            imgSrc: '/assets/img/R&D.jpg',
            alt: '2',
            title: serviceData.ITEM_2.TITLE,
            text: serviceData.ITEM_2.TEXT
          },
          {
            imgSrc: '/assets/img/fintech.jpg',
            alt: '3',
            title: serviceData.ITEM_3.TITLE,
            text: serviceData.ITEM_3.TEXT
          },
          {
            imgSrc: '/assets/img/security.avif',
            alt: '4',
            title: serviceData.ITEM_4.TITLE,
            text: serviceData.ITEM_4.TEXT
          },
          {
            imgSrc: '/assets/img/futuristic.webp',
            alt: '5',
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
