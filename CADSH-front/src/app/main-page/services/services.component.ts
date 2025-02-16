import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-services',
  imports: [DialogModule, ButtonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  visible: boolean = false;

  items = [
    {
      imgSrc: '/assets/img/harnessing.jpg',
      alt: '1',
      title: 'Harnessing Local Expertise',
      text: 'We capitalize on Kazakhstan’s highly skilled IT professionals, creating innovative and scalable solutions tailored to local and regional needs.'
    },
    {
      imgSrc: '/assets/img/R&D.jpg',
      alt: '2',
      title: 'Localized R&D',
      text: 'Our in-house research drives cutting-edge digital solutions adapted to the unique business and regulatory environments of Central Asia.'
    },
    {
      imgSrc: '/assets/img/fintech.jpg',
      alt: '3',
      title: 'Industry-Specific Focus',
      text: 'We specialize in fintech, edtech, SaaS, and cybersecurity to deliver industry-leading expertise in digital transformation.'
    },
    {
      imgSrc: '/assets/img/security.avif',
      alt: '4',
      title: 'Security-First Approach',
      text: 'Our cybersecurity experts ensure that all digital solutions meet the highest international security standards.'
    },
    {
      imgSrc: '/assets/img/futuristic.webp',
      alt: '5',
      title: 'Future-Proof Strategies',
      text: 'Future-Proof Strategies: We align businesses with global tech trends, ensuring long-term sustainability and competitive advantage.'
    }
  ]
  showDialog() {
    this.visible = true;
  }
}
