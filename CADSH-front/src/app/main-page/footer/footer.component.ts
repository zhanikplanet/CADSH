import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../email.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { response } from 'express';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, ButtonModule, CommonModule,MessageModule,ToastModule],
  providers:[MessageService],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  privacyVisible: boolean = false;
  termsVisible: boolean = false;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService, private messageService:MessageService) {
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

  showMessageStatus(status:string,severity:string,summary:string,detail:string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
  }


  send() {
    if (this.form.valid) {
      this.emailService.sendEmail(this.form.value).subscribe({
        next: (response: any) => {
         this.showMessageStatus('success', 'success', 'Mail sent successfully', response.message);
          this.form.reset();
        },
        error: (err: any) => {
          this.showMessageStatus('error', 'error', 'An error occured', err.error);
          console.error(err);
          alert('Failed to send email. Please try again later.');
        }
      });
    } else {
      alert('Please fill out all fields correctly.');
    }
  }
}
