import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ValidationsService } from '../../../core/services/validatations.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { API_BASE_URL } from '../../../api.config';

@Component({
  selector: 'app-enroll',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './enroll.component.html',
  styleUrl: './enroll.component.css',
})
export class EnrollComponent {
  enrollForm!: FormGroup;
  errorMessage: string = '';
  course_id!: number;

  success: boolean = false;
  enrollBtn = 'Enroll';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.parent?.params.subscribe((params) => {
      this.course_id = params['id'];
    });

    this.enrollForm = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.minLength(3),
            Validators.maxLength(32),
            Validators.required,
          ],
        ],
        email: ['', [Validators.email, Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(11),
            Validators.pattern(/^\d{11}$/),
          ],
        ],
        age: ['', Validators.required],
        address: ['', Validators.required],
        school: ['', Validators.required],
        course_id: [this.course_id],
      },
      {
        validators: ValidationsService.compareValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  onSubmit() {
    if (this.enrollForm.valid) {
      let apiUrl = `${API_BASE_URL}/enroll`;
      this.http.post(apiUrl, this.enrollForm.value).subscribe({
        next: (res: any) => {
          this.enrollForm.reset();
        },
        error: (err) =>
          (this.errorMessage = err.error.message || 'Invalid Credentials.'),
      });
      this.success = true;
      this.enrollBtn = 'Enroll Request Sent!';
    }
  }
}
