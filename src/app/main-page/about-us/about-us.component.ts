import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  missionPoints: string[] = [];

  constructor(private translate: TranslateService) {
    this.loadTranslations();
    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }

  loadTranslations() {
    this.translate.get('ABOUT_US.MISSION.POINTS').subscribe((points: string[]) => {
      this.missionPoints = Array.isArray(points) ? points : [];
    });
  }
}
