import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PageHeaderComponent } from '../../layout/header/header.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { API_BASE_URL } from '../../api.config';
API_BASE_URL
@Component({
  selector: 'app-contact-us',
  standalone: true,
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
  imports: [
    PageHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class ContactUsComponent {
  contactUs!: FormGroup;
  success: boolean = false;
  sendBtn = 'Send';
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  send(): void {
    if (this.contactUs.valid) {
      this.http
        .post(`${API_BASE_URL}/contact`, this.contactUs.value)
        .subscribe({
          next: (res: any) => {
            this.contactUs.reset();
          },
          error: (err) => err,
        });
      this.success = true;
      this.sendBtn = 'Sent Successfully';
    }
  }

  ngOnInit() {
    this.contactUs = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern(/^\d{11}$/),
        ],
      ],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
}
