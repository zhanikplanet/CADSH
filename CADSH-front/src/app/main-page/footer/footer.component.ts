import { EmailService } from '../../email.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    ButtonModule,
    CommonModule,
    TranslateModule // ✅ Ensure TranslateModule is imported
  ],
  providers: [MessageService, TranslateService],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  privacyVisible: boolean = false;
  termsVisible: boolean = false;
  form!: FormGroup;
  privacyPolicyContent: string = '';
  termsConditionsContent: string = '';

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService, private messageService: MessageService, private emailService: EmailService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') || 'kz';
      this.translate.use(savedLang);
    }

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });

    this.loadTranslations();
    this.translate.onLangChange.subscribe(() => this.loadTranslations());
  }

  loadTranslations() {
    this.translate.get('CONTACT.PRIVACY_POLICY.CONTENT').subscribe((text: string) => {
      this.privacyPolicyContent = text;
    });

    this.translate.get('CONTACT.TERMS_CONDITIONS.CONTENT').subscribe((text: string) => {
      this.termsConditionsContent = text;
    });
  }

  changeLanguage(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
    this.translate.use(lang);
    this.loadTranslations();
  }

  showPrivacyDialog() {
    this.privacyVisible = true;
  }

  showTermsDialog() {
    this.termsVisible = true;
  }

  showMessageStatus(status: string, severity: string, summary: string) {
    this.messageService.add({ severity: severity, summary: summary, life: 3000 });
  }

  send() {
    if (this.form.valid) {
      this.emailService.sendEmail(this.form.value).subscribe({
        next: (response: any) => {
          this.showMessageStatus('success', 'success', response.message);
          this.form.reset();
        },
        error: (err: any) => {
          this.showMessageStatus('error', 'error', err.error);
          console.error(err);
          alert('Failed to send email. Please try again later.');
        }
      });
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
