import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-footer',
  imports: [ReactiveFormsModule,DialogModule,ButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  privacyVisible: boolean = false;
  termsVisible: boolean = false;

  showPrivacyDialog() {
      this.privacyVisible = true;
  }

  showTermsDialog() {
      this.termsVisible = true;
  }

  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  constructor(private formBuilder: FormBuilder) {}

  send(): void {
    const { name, email, message } = this.form.value;
    alert(`Name: ${name}, Email: ${email}, Message: ${message} `);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(null),
      email: this.formBuilder.control(null),
      message: this.formBuilder.control(null),
    });
  }
}
