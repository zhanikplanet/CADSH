import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-jumbotron',
  imports: [ButtonModule],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.scss',
})
export class JumbotronComponent {
  scrollToContact() {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
