import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../email.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, ButtonModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  privacyVisible: boolean = false;
  termsVisible: boolean = false;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  showPrivacyDialog() {
    this.privacyVisible = true;
  }

  showTermsDialog() {
    this.termsVisible = true;
  }

  send() {
    if (this.form.valid) {
      this.emailService.sendEmail(this.form.value).subscribe({
        next: (response: any) => {
          alert('Email sent successfully!');
          this.form.reset();
        },
        error: (err: any) => {
          console.error(err);
          alert('Failed to send email. Please try again later.');
        }
      });
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
